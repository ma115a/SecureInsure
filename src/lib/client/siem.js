// src/lib/client/siem.js
/**
 * Logs a client-side security event by sending it to the internal SvelteKit API endpoint.
 * This endpoint then relays the log to the main SIEM backend.
 *
 * @param {Object} event
 * @param {string} event.type - The type of event (e.g., '2FA_FAILED_CLIENT', 'JS_ERROR').
 * @param {string} [event.details=''] - Additional details about the event.
 * @param {string} [event.severity='INFO'] - Severity level ('INFO', 'WARNING', 'CRITICAL').
 * @param {string} [event.url=window.location.pathname] - The URL where the event occurred.
 */
export async function logSecurityEvent({ type, details = '', severity = 'INFO', url = window.location.pathname }) {
    const logEntry = {
        type,
        details,
        severity,
        url,
        userAgent: navigator.userAgent, // Include user agent for context
    };

    try {
        // Send the log to the SvelteKit internal endpoint
        const response = await fetch('/internal/log-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logEntry)
        });

        if (!response.ok) {
            console.error(`[SIEM Client] Failed to send log to SvelteKit internal endpoint: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('[SIEM Client] Error sending log to SvelteKit internal endpoint:', error);
    }
}
