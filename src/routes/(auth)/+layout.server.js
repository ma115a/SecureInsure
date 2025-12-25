import { redirect } from "@sveltejs/kit";



export function load({locals, cookies, url}) {
    if(locals.user) {
        throw redirect(302, '/')
    }


    const tempUsername = cookies.get('temp_user')


    if(url.pathname === '/login/2fa' && !tempUsername) {
        throw redirect(302, '/login')
    }


    return { tempUsername}
}
