import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const users = Array.isArray(responseData) ? responseData : (responseData.users || responseData.data || []);

        return {
            users
        };
    } catch (error) {
        throw fail(500, {
            message: 'Could not load users.',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}

export const actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();

        const name = data.get('name');
        const lastname = data.get('lastname');
        const username = data.get('username');
        const password = data.get('password');
        const email = data.get('email');
        const confirmPassword = data.get('confirmPassword');
        const admin = 1

        if (password !== confirmPassword) {
            return fail(400, {
                message: "Passwords do not match",
                error: true
            });
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, lastname, username, password, email, admin })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                return fail(response.status, {
                    message: result.message,
                    error: true
                });
            }

            return {
                success: true,
                message: "User created successfully"
            };

        } catch (error) {
            console.log(error);
            return fail(500, {
                message: "Internal server error",
                error: true
            });
        }
    }
};
