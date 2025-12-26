import { redirect } from '@sveltejs/kit'

import jwt from 'jsonwebtoken'

const JWT_SECRET = 'giga_secret'
const BACKEND_URL = 'https://localhost:8443';
//
//
export async function handle({ event, resolve }) {

    const session = event.cookies.get('session')

    if (session) {
        try {
            const decoded = jwt.verify(session, JWT_SECRET);
            event.locals.user = decoded.userObject;
        } catch (error) {
            console.log("JWT Greška:", error.message);
            event.cookies.delete('session', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }

    // 2. AUTOMATSKO PROSLJEĐIVANJE TOKENA (Fetch Interceptor)
    // Svaki put kada pozovete fetch() u +page.server.js ili +server.js, 
    // ovaj kod će automatski dodati Authorization header.
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


    const isAuthRoute = url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/login/2fa')



    if (isProtectedRoute && !event.locals.user) {
        throw redirect(303, '/login')
    }
    const response = await resolve(event)
    return response
}
