
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, fetch, locals }) {
    if (!locals.user) {
        throw error(401, 'Niste ulogovani');
    }

    const { policyNumber } = params;
    console.log('pdf download')

    try {
        // Serverski poziv prema Expressu. hooks.server.js će ovdje dodati token.
        const response = await fetch(`https://localhost:8443/api/policy/download/${policyNumber}`);

        if (!response.ok) {
            throw error(response.status, 'Greška pri preuzimanju dokumenta');
        }

        return new Response(response.body, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Policy_${policyNumber}.pdf"`
            }
        });
    } catch (err) {
        console.error(err);
        throw error(500, 'Interna greška servera');
    }
}
