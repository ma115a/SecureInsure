



export async function load({ locals, fetch }) {

    try {
        const response = await fetch('/api/user/policies')


        if (!response.ok) {
            throw new Error("FETCH Error")
        }


        const responseData = await response.json()
        const policies = responseData.policies
        // console.log(responseData)

        return {
            policies
        }
    } catch (error) {
        console.log(error)
        throw fail(500, {
            message: 'Could not load policies',
            error: error instanceof Error ? error.message : String(error)
        })

    }



}
