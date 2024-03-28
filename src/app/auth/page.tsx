'use client'
import React, { useEffect } from 'react'
import RegisterForm from '@/components/Form/Register'
import LoginForm from '@/components/Form/Login'
import '../../styles/auth.scss'
import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import getAuthUser from '@/utilities/getAuthUser'

const RegisterationPage = () => {
  const params = useSearchParams()
  const router = useRouter()
  const type = params.get('type')

  useEffect(() => {
    const isAuth = async () => {
      const res = await getAuthUser()

      if (res.status === 'success') {
        router.push('/')
      } else if (res.error === 'Token is expired') {
        router.push('/auth?type=login')
      }
    }

    isAuth()
  }, [])

  return (
    <div className='auth-wrapper'>
      <div className={`container ${type == 'login' ? '' : 'active'}`} id='container'>
        <div className='form-container sign-up' data-hidden={type === 'login' ? 'register' : ''}>
          <RegisterForm />
        </div>
        <div className='form-container sign-in' data-hidden={type === 'register' ? 'login' : ''}>
          <LoginForm />
        </div>

        <div className='toggle-container'>
          <div className='toggle'>
            <div className='toggle-panel toggle-left'>
              <h1>Welcome To OnClick!</h1>
              <p>You are joining a family of learners. Sign up to get started!</p>
              <p style={{ fontSize: '15px', letterSpacing: '0.3px', margin: '50px 0 0 0', color: '#dadada' }}>
                You have an account login now!
              </p>
              <Button
                variant='contained'
                sx={{
                  mt: 1.5,
                  width: 250
                }}
                className='hidden'
                onClick={() => {
                  router.push('/auth?type=login')
                }}
              >
                Login
              </Button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h1>Welcome Back!</h1>
              <p>Log in to continue your learning.</p>
              <p style={{ fontSize: '15px', letterSpacing: '0.3px', margin: '50px 0 0 0', color: '#dadada' }}>
                You don`t have an account register now!
              </p>
              <Button
                variant='contained'
                sx={{
                  mt: 1.5,
                  width: 250
                }}
                className='hidden'
                onClick={() => {
                  router.push('/auth?type=register')
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterationPage
