
import {fail, redirect} from '@sveltejs/kit'


export const actions = {
    default: async({request, fetch, cookies}) => {
        const data = await request.formData()
        console.log(data)


        const username = data.get('username')
        const code = data.get('code')



        try {
            const response = await fetch('/api/check-2fa', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({username, code})
            })


            const result = await response.json()
            console.log(result)
            if(!response.ok || !result.success) {
                return fail(response.status, {
                    message: result.message,
                    error: true
                })
            }

            cookies.delete('temp_user', {path: '/'})


            cookies.set('session', result.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: true,
                maxAge : 60 * 60 * 24
            })


            throw redirect(303, '/')
        } catch(error) {
            if(error.status === 303) throw error
            console.log(error)
        }
    }
}
