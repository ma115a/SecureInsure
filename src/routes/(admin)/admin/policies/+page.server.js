import { fail } from '@sveltejs/kit'



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





export const actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData()
        console.log(data)

        const name = data.get('name')
        const basePrice = data.get('price')
        const baseCoverage = data.get('coverage')
        const description = data.get('description')

        console.log(basePrice)


        try {


            const response = await fetch('/api/add-policy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, basePrice, baseCoverage, description })
            })


            const result = await response.json()
            console.log(result)

            if (!response.ok || !result.success) {
                return fail(response.status, {
                    message: result.message,
                    error: true
                })
            }

        } catch (error) {
            console.log(error.message)
        }
    }
}
