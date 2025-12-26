
const BACKEND_URL = 'https://localhost:8443';

/**
 * Logs a security event by sending it to the Express backend.
 *
 * @param {Object} event
 * @param {Function} [event.fetcher] - The fetch function to use (e.g., event.fetch in SvelteKit).
 * @param {string} event.type - The type of event (e.g., 'AUTH_FAILURE', 'ADMIN_ACCESS').
 * @param {string|null} event.user - The username or ID of the user (or 'anonymous').
 * @param {string} event.ip - The IP address of the client.
 * @param {string} [event.severity='INFO'] - Severity level ('INFO', 'WARNING', 'CRITICAL').
 * @param {string} [event.details=''] - Additional details about the event.
 * @param {string} [event.url=''] - The URL being accessed.
 * @param {string} [event.method=''] - The HTTP method (GET, POST, etc.).
 */
export async function logSecurityEvent({ fetcher, type, user, ip, severity = 'INFO', details = '', url = '', method = '' }) {
    const timestamp = new Date();
    const isoTimestamp = timestamp.toISOString();
    const date = timestamp.toLocaleDateString('en-US'); // Format as needed
    const time = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format as needed

    const logEntry = {
        timestamp: isoTimestamp,
        date,
        time,
        type,
        user: user || 'anonymous',
        ip,
        severity,
        details,
        url,
        method
    };

    try {
        const fetchToUse = fetcher || fetch; // Use provided fetcher or global fetch as fallback

        const response = await fetchToUse(`/api/siem/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logEntry)
        });

        if (!response.ok) {
            console.error(`[SIEM] Failed to send log to backend: ${response.status} ${response.statusText}`);
            // Fallback: ensure we still see it in the server console
            console.log('[SIEM FALLBACK]', JSON.stringify(logEntry));
        }

    } catch (error) {
        console.error('[SIEM] Error sending log to backend:', error.message);
        console.log('[SIEM FALLBACK]', JSON.stringify(logEntry));
    }
}
