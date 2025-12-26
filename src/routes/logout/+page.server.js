import { redirect } from '@sveltejs/kit';
import { logSecurityEvent } from '$lib/server/siem';

export const actions = {
    default: async ({ cookies, locals, fetch, getClientAddress }) => {
        // Log the logout event
        if (locals.user) {
            let ip = '127.0.0.1';
            try {
                 ip = getClientAddress();
            } catch (e) {
                // Fallback
            }

            await logSecurityEvent({
                fetcher: fetch,
                type: 'LOGOUT',
                user: locals.user.username || 'unknown',
                ip: ip,
                details: 'User initiated logout',
                severity: 'INFO',
                url: '/logout',
                method: 'POST'
            });
        }

        // Destroy the session
        cookies.delete('session', { path: '/' });
        
        // Redirect to login page
        throw redirect(303, '/login');
    }
};
