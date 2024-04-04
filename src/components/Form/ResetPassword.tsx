'use client'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, FormControl, FormLabel, Input, useMediaQuery } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const ResetPasswordForm = () => {
  const mediaQuery = useMediaQuery('(max-width: 800px)') //done
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const params = useSearchParams()
  const email = params.get('email')
  const code = params.get('code')

  const handleFormSubmit = async (data: any) => {
    try {
      if (data.password !== data.passwordConfirm) {
        console.log('passwords do not match')
        return
      }
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/password/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          code,
          password: data.password
        })
      })
      const user = await res.json()
      console.log(user)
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: 500,
        m: 'auto',
        p: 2,
        gap: 3
      }}
      style={{ padding: '1%', background: 'linear-gradient(to left, #181717, #09161f)', borderRadius: 35 }}
    >
      <h2 style={{ textAlign: 'center', color: '#fff' }}>Reset Your Password</h2>

      <div style={{ margin: mediaQuery ? 'auto 0' : '0', width: '60%', display: 'flex', flexDirection: 'column' }}>
        <FormControl key={'password'}>
          <Input
            id='password'
            type='password'
            {...register('password', {
              required: 'This is required',
              minLength: {
                value: 6,
                message: 'Minimum length should be 6'
              }
            })}
            placeholder='Password'
            style={{ width: '100%' }}
          />
        </FormControl>
        <FormControl key={'confirmPassword'}>
          <Input
            id='passwordConfirm'
            type='password'
            {...register('passwordConfirm', {
              required: 'This is required',
              minLength: {
                value: 6,
                message: 'Minimum length should be 6'
              }
            })}
            placeholder='Confirm Password'
          />
        </FormControl>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 auto',
          width: '60%'
        }}
      >
        <Button type='submit' variant='contained' style={{ width: '38%', background: '#031999' }}>
          Reset
        </Button>
        <Button variant='contained' onClick={() => router.push('/')} style={{ width: '38%', background: '#031999' }}>
          Cancel
        </Button>
      </div>
    </Box>
  )
}

export default ResetPasswordForm
