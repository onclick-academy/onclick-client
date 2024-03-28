'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { getDeviceToken } from '@/utilities/device'
import getAuthUser from '@/utilities/getAuthUser'

export default function Home() {
  const fetchDeviceToken = async () => {
    const deviceToken = await getDeviceToken()
    console.log('deviceToken', deviceToken)
    // TODO save the token in DB
  }
  useEffect(() => {
    const _ = async () => {
      const authUser = await getAuthUser()
      console.log(authUser)
      await fetchDeviceToken()
    }
    _()
  }, [])

  return (
    <main>
      <div>
      </div>
    </main>
  )
}
