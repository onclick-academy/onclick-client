'use client'
import React, { useState } from 'react'
import RegisterForm from '@/components/Form/Register'
import LoginForm from '@/components/Form/Login'
import '../style.scss'

// useState

const RegisterationPage = () => {
  const [classNameList, setClassNameList] = useState('container')

  const handleLoginBtn = () => {
    setClassNameList('container')
  }

  const handleRegisterBtn = () => {
    setClassNameList('container active')
  }

  return (
    // <AuthNav />
    <div className={`${classNameList}`} id='container'>
      <div className='form-container sign-up'>
        <RegisterForm />
      </div>
      <div className='form-container sign-in'>
        <LoginForm />
      </div>

      <div className='toggle-container'>
        {/* style={{display: mediaQuery? "none" : ""}} */}
        <div className='toggle'>
          <div className='toggle-panel toggle-left'>
            <h1>Welcome Back!</h1>
            <p>Log in to continue your learning!</p>
            <button className='hidden' onClick={handleLoginBtn} id='login'>
              Sign In
            </button>
          </div>
          <div className='toggle-panel toggle-right'>
            <h1>Welcome To OnClick!</h1>
            <p>You are joining a family of learners. Sign up to get started!</p>
            <button className='hidden' onClick={handleRegisterBtn} id='register'>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterationPage
