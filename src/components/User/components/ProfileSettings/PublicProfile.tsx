import { fetcher } from '@/utilities/fetcher'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, FormControl, TextField, MenuItem, Select, InputLabel, Avatar } from '@mui/material'

export default function PublicProfile({ userData }) {
  const [profilePic, setprofilePic] = useState('')
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const handleUpdateUser = async data => {
    if (profilePic) data.profilePic = profilePic
    if (!data.firstName) delete data.firstName
    if (!data.lastName) delete data.lastName
    if (!data.username) delete data.username
    if (!data.bio) delete data.bio
    if (!data.birthDate) delete data.birthDate
    if (!data.profilePic) delete data.profilePic
    if (!data.email) data.email = undefined
    if (!data.password) data.password = undefined
    if (!data.confirmPassword) delete data.confirmPassword
    if (!data.phoneNum) delete data.phoneNum
    if (!data.gender) delete data.gender

    const url = `/users/${userData.id}`
    const res = await fetcher({ url, method: 'PUT', body: data })
    console.log(res)
  }
  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleUpdateUser)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        width: '70%',
        margin: '0 auto'
      }}
    >
      {profilePic && userData && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Avatar src={profilePic ? profilePic : userData.profilePic} sx={{ width: 150, height: 150 }}></Avatar>
        </Box>
      )}
      <Controller
        name='profilePic'
        control={control}
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <Button
            variant='contained'
            component='label'
            sx={{
              width: '10.5rem',
              margin: 'auto'
            }}
          >
            Upload Photo
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={e => {
                setprofilePic(URL.createObjectURL(e.target.files[0]))
                onChange(e.target.files)
              }}
              onBlur={onBlur}
              name={name}
              ref={ref}
            />
          </Button>
        )}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl style={{ width: '45%' }}>
          <TextField
            fullWidth
            label='First Name'
            {...register('firstName')}
            placeholder={userData?.firstName}
            variant='outlined'
          />
        </FormControl>
        <FormControl style={{ width: '45%' }}>
          <TextField
            fullWidth
            label='Last Name'
            {...register('lastName')}
            placeholder={userData?.lastName}
            variant='outlined'
          />
        </FormControl>
        <FormControl style={{ width: '45%' }}>
          <TextField
            fullWidth
            label='Username'
            {...register('username')}
            placeholder={userData?.username}
            variant='outlined'
          />
        </FormControl>
      </div>

      <FormControl fullWidth>
        <TextField fullWidth label='Bio' {...register('bio')} placeholder={userData?.bio} variant='outlined' />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          fullWidth
          label='Birth Date'
          type='date'
          InputLabelProps={{
            shrink: true
          }}
          value={userData?.birthDate}
          {...register('birthDate')}
          variant='outlined'
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id='gender-label'>Gender</InputLabel>
        <Select
          labelId='gender-label'
          placeholder={userData?.gender}
          onChange={event => {
            /* Handle gender change */
          }}
          {...register('gender')}
          label='Gender'
        >
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
        </Select>
      </FormControl>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained'>
          Save Changes
        </Button>
      </div>
    </Box>
  )
}
