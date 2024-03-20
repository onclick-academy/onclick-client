'use client'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Box, Button, FormControl, Input, FormHelperText, useMediaQuery } from '@mui/material'

import '../../app/style.scss'

const RegisterForm = () => {
  const mediaQuery = useMediaQuery('(max-width: 800px)') //done

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const router = useRouter()

  const password = useRef({})
  password.current = watch('password', '')
  const confirmPassword = useRef({})
  confirmPassword.current = watch('confirmPassword', '')

  const handleFormSubmit = async data => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/register', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    const user = await res.json()
    console.log(user)
    if (user.status === 'success') {
      router.push('/')
    }
  }

  return (
    <Box
      component='form'
      method='POST'
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={
        mediaQuery
          ? {
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
              width: '50%',
              maxWidth: 500,
              margin: '0 auto'
            }
          : {
              display: 'flex',
              flexDirection: 'column',
              gap: 0.9,
              margin: '0 auto'
            }
      }
    >
      <div
        style={{
          display: mediaQuery ? 'flex' : 'none',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
          gap: '.6rem'
        }}
      >
        <h3>Sign Up</h3>
        <p style={{ color: 'GrayText' }}>Start your learning journey now with us!</p>
      </div>

      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        <FormControl>
          <Input
            {...register('fullName', {
              required: 'This field is required'
            })}
            id='fullName'
            type='text'
            name='fullName'
            placeholder='Full Name'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
        </FormControl>
        {errors.fullName && <FormHelperText>{String(errors.fullName?.message)}</FormHelperText>}
      </div>

      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        <FormControl>
          <Input
            {...register('username', {
              required: 'This field is required'
            })}
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.username && <FormHelperText>{String(errors.username?.message)}</FormHelperText>}
        </FormControl>
        <FormControl>
          <Input
            {...register('email', {
              required: 'This field is required'
            })}
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.email && <FormHelperText>{String(errors.email?.message)}</FormHelperText>}
        </FormControl>
      </div>
      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        <FormControl>
          <Input
            {...register('password', {
              required: 'This field is required'
            })}
            id='password'
            type='password'
            name='password'
            placeholder='Password'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.password && <FormHelperText>{String(errors.password?.message)}</FormHelperText>}
        </FormControl>

        <FormControl style={{ margin: '0 10px' }}>
          <Input
            {...register('confirmPassword', {
              required: 'This field is required',
              validate: value => value === password.current || 'The passwords do not match'
            })}
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '82%' : '50%' }}
          />
          {errors.confirmPassword && <FormHelperText>{String(errors.confirmPassword?.message)}</FormHelperText>}
        </FormControl>
      </div>
      {/* birthDate and gender */}

      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        <FormControl style={{ margin: '0 10px', width: '45%' }}>
          <Input
            {...register('birthDate', {
              required: 'This field is required'
            })}
            id='birthDate'
            type='date'
            name='birthDate'
            placeholder='Birth Date'
            style={{ margin: mediaQuery ? '0 20%' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.birthDate && <FormHelperText>{String(errors.birthDate?.message)}</FormHelperText>}
        </FormControl>

        <FormControl>
          <select
            {...register('gender')}
            id='gender'
            name='gender'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '75%' : '50%' }}
          >
            <option value={'MALE'} key={'MALE'}>
              Male
            </option>
            <option value={'FEMALE'} key={'FEMALE'}>
              Female
            </option>
          </select>
        </FormControl>
      </div>

      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        {/* phoneNum */}
        <FormControl style={{ margin: '0 10px' }}>
          <Input
            {...register('phoneNum', {
              required: 'This field is required'
            })}
            id='phoneNum'
            type='text'
            name='phoneNum'
            placeholder='Phone Number'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.phoneNum && <FormHelperText>{String(errors.phoneNum?.message)}</FormHelperText>}
        </FormControl>

        <FormControl>
          <select
            {...register('educationLevel')}
            id='educationLevel'
            name='educationLevel'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '75%' : '50%' }}
          >
            <option value={'ELEMENTARY'} key={'ELEMENTARY'}>
              Elementary
            </option>
            <option value={'MIDDLE'} key={'MIDDLE'}>
              Middle
            </option>
            <option value={'HIGH'} key={'HIGH'}>
              High
            </option>
            <option value={'COLLEGE'} key={'COLLEGE'}>
              College
            </option>
            <option value={'UNIVERSITY'} key={'UNIVERSITY'}>
              University
            </option>
            <option value={'MASTER'} key={'MASTER'}>
              Master
            </option>
            <option value={'PHD'} key={'PHD'}>
              Phd
            </option>
          </select>
        </FormControl>
      </div>
      {/* bio */}

      <div
        className='form-header'
        style={{ display: 'flex', gap: '0.6rem', flexDirection: mediaQuery ? 'column' : 'row' }}
      >
        <FormControl>
          <Input
            {...register('bio', {
              required: 'This field is required'
            })}
            id='bio'
            type='text'
            name='bio'
            placeholder='Bio'
            style={{ margin: mediaQuery ? '0 auto' : '0', width: mediaQuery ? '80%' : '50%' }}
          />
          {errors.bio && <FormHelperText>{String(errors.bio?.message)}</FormHelperText>}
        </FormControl>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: mediaQuery ? '0 auto' : '0',
          width: mediaQuery ? '80%' : '100%'
        }}
      >
        <Button type='submit' variant='contained' style={{ width: '45%', background: '#031999' }}>
          Signup
        </Button>
        <Button variant='contained' onClick={() => router.push('/')} style={{ width: '45%', background: '#031999' }}>
          Cancel
        </Button>
      </div>
    </Box>
  )
}

export default RegisterForm
