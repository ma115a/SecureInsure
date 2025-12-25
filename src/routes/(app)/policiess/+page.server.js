

import { fail } from '@sveltejs/kit';


export async function load({ fetch }) {
    try {
        const response = await fetch('/api/policies')


        if (!response.ok) {
            throw new Error("HTTPS error")
        }


        const responseData = await response.json()
        const policies = responseData.policies
        return {
            policies
        }

    } catch (error) {
        throw fail(500, {
            message: 'Could not load policies',
            error: error instanceof Error ? error.message : String(error)
        })
    }
}
