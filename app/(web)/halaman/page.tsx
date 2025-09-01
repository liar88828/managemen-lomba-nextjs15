import { getSession } from '@/app/actions/session'
import { redirect } from 'next/navigation'

export default async function page() {

    const session = await getSession()
    const role = session.user?.role
    if (role === 'ADMIN') {
        redirect('/admin')
    } else if (role === 'PANITIA') {
        redirect('/panitia')
    } else if (role === 'PESERTA') {
        redirect('/peserta')
    } else {
        redirect('/login')
    }

    // return (
    //     <div>Will redirect</div>
    // )
}
