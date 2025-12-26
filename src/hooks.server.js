import { redirect } from '@sveltejs/kit'

import jwt from 'jsonwebtoken'
import { logSecurityEvent } from '$lib/server/siem';

const JWT_SECRET = 'giga_secret'
const BACKEND_URL = 'https://localhost:8443';

export async function handle({ event, resolve }) {
    let clientIp = '127.0.0.1';
    try {
        clientIp = event.getClientAddress();
    } catch {
        // Fallback if IP cannot be determined (e.g. during dev)
    }

    const session = event.cookies.get('session')

    if (session) {
        try {
            const decoded = jwt.verify(session, JWT_SECRET);
            event.locals.user = decoded.userObject;
        } catch (error) {
            console.log("JWT Error:", error.message);
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    // SIEM: Log access to Admin Panel (AFTER auth check so we have the username)
    if (event.url.pathname.startsWith('/admin')) {
        // Check if user is logged in
        if (!event.locals.user) {
            throw redirect(303, '/login');
        }

        // Check for admin role
        if (event.locals.user.role !== 'admin') {
            logSecurityEvent({
                fetcher: event.fetch,
                type: 'UNAUTHORIZED_ACCESS',
                user: event.locals.user.username,
                ip: clientIp,
                url: event.url.pathname,
                method: event.request.method,
                severity: 'CRITICAL',
                details: `User ${event.locals.user.username} tried to access admin panel`
            });
            throw redirect(303, '/');
        }

        logSecurityEvent({
            fetcher: event.fetch,
            type: 'ADMIN_ACCESS_ATTEMPT',
            user: event.locals.user?.username || 'anonymous',
            ip: clientIp,
            url: event.url.pathname,
            method: event.request.method,
            severity: 'WARNING',
            details: 'Access to protected admin area'
        });
    }

    const originalFetch = event.fetch;
    event.fetch = (info, init) => {
        const url = typeof info === 'string' ? info : info.url;

        // Ako zahtjev ide prema našem Express serveru, dodajemo token
        if (session && (url.includes(BACKEND_URL) || url.startsWith('/api'))) {
            const headers = new Headers(init?.headers);
            if (!headers.has('Authorization')) {
                headers.set('Authorization', `Bearer ${session}`);
            }
            init = { ...init, headers };
        }
        return originalFetch(info, init);
    };





    const url = event.url.pathname


    const isProtectedRoute = url === '/' || url.startsWith('/policies')


    const isAuthRoute = url === '/login' || url === '/register' || url === '/login/2fa'



    if (isProtectedRoute && !event.locals.user && !isAuthRoute) { // Ensure auth routes are accessible when not logged in
        throw redirect(303, '/login')
    }
    const response = await resolve(event)

    // Set Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Consider adding a Content-Security-Policy (CSP) if you are not using one.
    // CSP can be complex to configure correctly and may break parts of your app
    // if not done carefully. Example:
    // response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'");


    // SIEM: Log Errors (4xx, 5xx)
    if (response.status >= 400) {
        logSecurityEvent({
            fetcher: event.fetch,
            type: response.status === 404 ? 'RESOURCE_NOT_FOUND' : 'SECURITY_ALERT',
            severity: response.status >= 500 ? 'CRITICAL' : 'WARNING',
            user: event.locals.user?.username || 'anonymous',
            ip: clientIp,
            url: event.url.pathname,
            method: event.request.method,
            details: `Response Status: ${response.status}`
        });

        // Redirect 404s to home
        if (response.status === 404) {
            throw redirect(303, '/');
        }
    }

    return response
}
