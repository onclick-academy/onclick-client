import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, TextField, Link, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'

import '../../styles/auth.scss'
import { authFetcher } from '@/utilities/fetcher'
import { useRouter } from 'next/navigation'

interface UserLoginI {
  email: string
  password: string
  isRememberMe: boolean
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginI>()

  const router = useRouter()

  const handleFormSubmit = async (data: UserLoginI) => {
    const res = await authFetcher({ body: data, action: 'login' })
    console.log(res)
  }

  return (
    <Box
      component='form'
      method='POST'
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: 'auto',
        gap: 1
      }}
      className='auth-login'
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          gap: 1
        }}
      >
        <TextField
          {...register('email', { required: 'Email is required' })}
          id='email'
          label='Email'
          variant='outlined'
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          {...register('password', { required: 'Password is required' })}
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          fullWidth
        />
      </Box>
      <Box>
        <Link
          href='/forgetpassword'
          style={{
            color: 'blue',
            fontSize: '0.8rem'
          }}
        >
          Forgot Password?
        </Link>
      </Box>
      <FormControlLabel
        control={<Checkbox {...register('isRememberMe')} id='isRememberMe' name='isRememberMe' />}
        label='Remember me?'
      />
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', gap: 1 }}>
        <Button type='submit' variant='contained' sx={{ width: '50%' }}>
          Login
        </Button>
      </Box>
      <Typography
        sx={{
          width: '70%',
          color: '#b0cdff',
          cursor: 'pointer',
          fontSize: '1.1rem',
          letterSpacing: '0.3px',
          textDecoration: 'underline',
          pb: '50px'
        }}
        className='hidden'
        onClick={() => {
          router.push('/auth?type=register')
        }}
        id='register'
      >
        Or Create Account
      </Typography>
    </Box>
  )
}

export default LoginForm
