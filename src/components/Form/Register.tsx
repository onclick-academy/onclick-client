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
  fullName: string
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
  const [profilePicPreview, setProfilePicPreview] = useState('')
  const [hovered, setHovered] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<UserRegisterI>()
  const router = useRouter()

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const watchProfilePic = watch('profilePic')

  useEffect(() => {
    if (watchProfilePic && watchProfilePic.length > 0) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicPreview(reader?.result?.toString() ?? '')
      }
      reader.readAsDataURL(watchProfilePic[0])
    }
  }, [watchProfilePic])

  const onSubmit = async (data: UserRegisterI) => {
    // Assuming `authFetcher` is an async function that handles registration
    try {
      const res = await authFetcher({ body: data, action: 'register' })
      console.log(res)
      router.push('/') // Navigate to home or dashboard page
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
              src={profilePicPreview}
              alt='Profile Picture'
              sx={{ width: 80, height: 80, margin: 'auto', cursor: 'pointer' }}
            >
              <AddPhotoAlternateIcon sx={{ fontSize: 40, color: hovered ? 'primary.main' : 'primary.light' }} />
            </Avatar>
            <TextField
              {...register('profilePic')}
              type='file'
              id='profilePicInput'
              inputProps={{ accept: 'image/*' }}
              onChange={e => setProfilePicPreview(URL.createObjectURL(e.target.files[0]))}
              style={{ display: 'none' }}
            />
          </label>
          {/* Full Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Full Name'
              {...register('fullName', { required: 'Full name is required' })}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName?.message}
            />
          </Grid>
        </Grid>

        {/* Username */}
        <Grid item xs={16} sm={8}>
          <TextField
            fullWidth
            label='Username'
            {...register('username', { required: 'Username is required' })}
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField fullWidth {...register('gender')} select label='Gender'>
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
            {...register('bio')}
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
            error={Boolean(errors.email)}
            helperText={errors.email && (errors.email?.message || 'Please enter a valid email.')}
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
            error={Boolean(errors.phoneNum)}
            helperText={!!errors.phoneNum && (errors.phoneNum?.message || 'Please enter a valid phone number.')}
          />
        </Grid>

        {/* Birth Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Birth Date'
            type='date'
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ shrink: true }}
            {...register('birthDate', { required: 'Birth date is required' })}
            error={Boolean(errors.birthDate)}
            helperText={errors.birthDate?.message}
          />
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
