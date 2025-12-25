import {redirect} from '@sveltejs/kit'

import jwt from 'jsonwebtoken'

const JWT_SECRET = 'giga_secret'
//
//
export async function handle({event, resolve}) {

    const session = event.cookies.get('session')


    if(session) {
        try {

            const decoded = jwt.verify(session, JWT_SECRET)

            console.log(decoded)

            event.locals.user = decoded.userObject


        } catch (error) {
            console.log(error)
            event.cookies.delete('session', {path: '/'})
            event.locals.user = null

        }
    } else {event.locals.user = null}





    const url = event.url.pathname


    const isProtectedRoute = url === '/' || url.startsWith('/policies')


     const isAuthRoute = url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/login/2fa')



     if(isProtectedRoute && !event.locals.user) {
         throw redirect(303, '/login')
     }
    const response = await resolve(event)
    return response
}
