'use client'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Box, Button, Grid, TextField, InputAdornment, IconButton, MenuItem, Avatar, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import '../../styles/auth.scss' // Ensure this SCSS file contains all the necessary styles.
import { authFetcher } from '@/utilities/fetcher'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

const EDUCATION_LEVELS = [
  { value: 'ELEMENTARY', label: 'Elementary' },
  { value: 'MIDDLE', label: 'Middle' },
  { value: 'HIGH', label: 'High' },
  { value: 'COLLEGE', label: 'College' },
  { value: 'UNIVERSITY', label: 'University' },
  { value: 'MASTER', label: 'Master' },
  { value: 'PHD', label: 'PhD' }
]

type EducationLevels = 'ELEMENTARY' | 'MIDDLE' | 'HIGH' | 'COLLEGE' | 'UNIVERSITY' | 'MASTER' | 'PHD'
interface UserRegisterI {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
  bio: string
  phoneNum: string
  birthDate: string
  educationLevel: EducationLevels
  gender: 'Male' | 'Female'
  profilePic: string
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [profilePicPreview, setProfilePicPreview] = useState({
    sendV: '',
    previewV: ''
  })
  const [registerError, setRegisterError] = useState({
    phoneNumber: '',
    email: '',
    username: ''
  })

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<UserRegisterI>()
  const router = useRouter()

  const isOldEnough = (value: string) => {
    return dayjs().subtract(16, 'year').isAfter(value) || 'Must be at least 16 years old'
  }
  const maxDate = dayjs().subtract(16, 'years')

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const onSubmit = async (data: UserRegisterI) => {
    try {
      const res = await authFetcher({
        body: {
          ...data,
          profilePic: profilePicPreview.sendV || 'default-avatar.png'
        },
        action: 'register'
      })
      console.log(res.status)
      if (res.status === 'success') {
        router.push('/')
      } else {
        setRegisterError({
          phoneNumber: res.error.toLowerCase().includes('phone') ? res.error : '',
          email: res.error.toLowerCase().includes('email') ? res.error : '',
          username: res.error.toLowerCase().includes('username') ? res.error : ''
        })
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <Box className='auth-register' component='form' method='POST' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <label htmlFor='profilePicInput'>
            <Avatar
              src={profilePicPreview.previewV}
              alt='Profile Picture'
              sx={{ width: 80, height: 80, margin: 'auto', cursor: 'pointer' }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <TextField
              {...register('profilePic')}
              type='file'
              id='profilePicInput'
              inputProps={{ accept: 'image/*' }}
              onChange={e => {
                const target = e.target as HTMLInputElement
                if (target.files) {
                  const file = target.files[0]
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setProfilePicPreview({
                      sendV: file.name.toString(),
                      previewV: reader.result?.toString() ?? ''
                    })
                  }
                  reader.readAsDataURL(file)
                }
              }}
              style={{ display: 'none' }}
            />
          </label>
          {/* Full Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='First Name'
              {...register('firstName', { required: 'First name is required' })}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Last Name'
              {...register('lastName', { required: 'Last name is required' })}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          </Grid>
        </Grid>

        {/* Username */}
        <Grid item xs={16} sm={8}>
          <TextField
            fullWidth
            label='Username'
            {...register('username', { required: 'Username is required' })}
            error={Boolean(errors.username) || Boolean(registerError.username)}
            helperText={errors.username?.message || registerError.username}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField fullWidth {...register('gender', { required: 'gender is required' })} select label='Gender'>
            <MenuItem value='MALE'>Male</MenuItem>
            <MenuItem value='FEMALE'>Female</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Bio'
            multiline
            rows={3}
            {...register('bio', { required: 'Please write our a brief of yourself' })}
            error={Boolean(errors.bio)}
            helperText={errors.bio?.message}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email format'
              }
            })}
            error={Boolean(errors.email) || Boolean(registerError.email)}
            helperText={errors.email?.message || registerError.email}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='educationLevel'
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField select label='Education Level' fullWidth variant='outlined' value={value} onChange={onChange}>
                {EDUCATION_LEVELS.map(level => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        {/* Password field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleShowPassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Confirm Password field */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              validate: value => value === watch('password') || 'The passwords do not match'
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={toggleShowConfirmPassword} edge='end'>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        {/* Phone Number */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Phone Number'
            placeholder='e.g. 201xxxxxxxxx'
            {...register('phoneNum', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid phone number'
              }
            })}
            error={Boolean(errors.phoneNum) || Boolean(registerError.phoneNumber)}
            helperText={!!errors.phoneNum || registerError.phoneNumber}
          />
        </Grid>

        {/* Birth Date */}
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='birthDate'
              control={control}
              rules={{ required: 'Birth date is required', validate: isOldEnough }}
              render={({ field }) => (
                <DatePicker
                  label='Birth Date'
                  value={field.value as unknown as Dayjs}
                  onChange={(newValue: any) => {
                    field.onChange(newValue)
                  }}
                  maxDate={maxDate.isValid() ? maxDate : dayjs()}
                  // @ts-ignore-next-line
                  renderInput={params => (
                    <TextField {...params} error={Boolean(errors.birthDate)} helperText={errors.birthDate?.message} />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 2, mt: 3, width: '100%' }}>
        <Button type='submit' variant='contained' sx={{ px: 5, width: '60%' }}>
          Signup
        </Button>
        <Typography
          sx={{
            width: '70%',
            color: '#b0cdff',
            cursor: 'pointer',
            fontSize: '1rem',
            letterSpacing: '0.3px',
            textDecoration: 'underline',
            pb: '50px'
          }}
          className='hidden'
          onClick={() => {
            router.push('/auth?type=login')
          }}
          id='register'
        >
          Or you have an account, login now!
        </Typography>
      </Box>
    </Box>
  )
}

export default RegisterForm
