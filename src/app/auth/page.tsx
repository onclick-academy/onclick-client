'use client'
import { Suspense } from 'react'
import RegistrationPage from './Registration'

const Page = () => {
  return (
    <Suspense>
      <RegistrationPage />
    </Suspense>
  )
}

export default Page
