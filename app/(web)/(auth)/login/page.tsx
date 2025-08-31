import React from 'react'
import LoginPage from '../login-page'
import { getSession } from '@/app/actions/session'

export default async function page() {
  // console.log(await getSession())
  return (<LoginPage />)
}
