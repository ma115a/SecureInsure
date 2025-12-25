import {fail, redirect} from '@sveltejs/kit'


export const actions = {
    default: async({request, fetch, cookies}) => {
        const data = await request.formData()
        console.log(data)


        const username = data.get('username')
        const password = data.get('password')



        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({username, password})
            })


            const result = await response.json()
            console.log(result)
            if(!response.ok || !result.success) {
                return fail(response.status, {
                    message: result.message,
                    error: true
                })
            }


            cookies.set('temp_user', String(username), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 300
            })
            throw redirect(303, '/login/2fa')
        } catch(error) {
            if(error.status === 303) throw error
            console.log(error)
        }
    }
}
