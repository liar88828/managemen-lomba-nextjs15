import React from 'react'
import LandingPage from './landing-page'
import { getSession } from './actions/session'

export default async function page() {
  const session = await getSession()
  return (
    <LandingPage user={session.user} />
  )
}
