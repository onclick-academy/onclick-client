'use client'
import { Suspense } from 'react'
import RegistrationPage from './Registration'
import React, { useEffect } from 'react'
import '../../styles/auth.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import getAuthUser from '@/utilities/getAuthUser'

const Page = () => {
  const params = useSearchParams()
  const router = useRouter()
  const type = params.get('type')

  useEffect(() => {
    const isAuth = async () => {
      const res = await getAuthUser()

      if (res && res.status === 'success') {
        router.push('/')
      } else if (res.error === 'Token is expired') {
        router.push('/auth?type=login')
      }
    }

    isAuth()
  }, [router])

  return (
    <Suspense>
      <RegistrationPage />
    </Suspense>
  )
}

export default Page
