// src/routes/internal/log-event/+server.js
import { json } from '@sveltejs/kit';
import { logSecurityEvent } from '$lib/server/siem';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, getClientAddress, locals, fetch }) {
    try {
        const clientLog = await request.json();

        // Get client IP address safely
        let clientIp = '127.0.0.1';
        try {
            clientIp = getClientAddress();
        } catch (e) {
            // Fallback for environments where client IP cannot be determined
            console.warn("Could not determine client IP for SIEM log from client.", e);
        }

        // Use the server-side logSecurityEvent function
        // Pass event.fetch for correct backend communication (e.g., handling HTTPS for localhost)
        // Pass event.locals.user?.username for authenticated user context
        await logSecurityEvent({
            fetcher: fetch, // Use the fetch from the event context
            type: clientLog.type,
            user: locals.user?.username || clientLog.user || 'anonymous', // Prefer server user, then client user, then anonymous
            ip: clientIp,
            severity: clientLog.severity || 'INFO',
            details: clientLog.details,
            url: clientLog.url || request.url,
            method: request.method
        });

        return json({ status: 'ok' }, { status: 200 });

    } catch (error) {
        console.error('Error processing client SIEM log:', error);
        return json({ status: 'error', message: error.message }, { status: 500 });
    }
}
