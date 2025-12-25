
import {fail, redirect} from '@sveltejs/kit'


export const actions = {
    default: async({request, fetch}) => {
        const data = await request.formData()


        const name = data.get('name')
        const lastname = data.get('lastname')
        const username = data.get('username')
        const password = data.get('password')
        const email = data.get('email')
        const confirmPassword = data.get('confirmPassword')



        if(password != confirmPassword) {
            return fail(400, {
                message: "Passwords do not match",
                error: true
            })
        }


        try {

            const response = await fetch ('/api/register', {
                method: 'POST', 
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({name, lastname, username, password, email})
            })


            const result = await response.json()
            console.log(result)

            if(!response.ok || !result.success) {
                return fail(response.status, {
                    message: result.message,
                    error: true
                }) 

            }
            throw redirect(303, '/login')
            
        } catch (error) {
            if(error.status === 303) throw error
        console.log(error)
            
            console.log(error.message)
        }
    }
}
