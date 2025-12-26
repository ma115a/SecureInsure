import { json } from '@sveltejs/kit';

export async function POST({ request, fetch }) {
    try {
        const body = await request.json();

        const response = await fetch('https://localhost:8443/api/capture-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        return json(data, { status: response.status });
    } catch (err) {
        console.error("Capture Proxy Error:", err);
        return json({ success: false, message: "Interna greška na proxy serveru" }, { status: 500 });
    }
}
