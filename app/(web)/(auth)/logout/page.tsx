import React from 'react'
import LogoutPage from '../logout-page'
import { getSessionUser } from '@/app/actions/session'

export default async function page() {
    const session = await getSessionUser()
    return (<LogoutPage session={session} />)
}
