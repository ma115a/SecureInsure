
import { fail } from '@sveltejs/kit'



export async function load({ fetch }) {
    try {
        const response = await fetch('/api/siem/logs')


        if (!response.ok) {
            throw new Error("HTTPS error")
        }


        const responseData = await response.json()

        const logs = responseData.logs

        return {
            logs
        }

    } catch (error) {
        console.log(eror)
        throw fail(500, {
            message: 'Could not load policies',
            error: error instanceof Error ? error.message : String(error)
        })
    }
}
