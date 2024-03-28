import { useForm } from 'react-hook-form'
import { Box, Button, FormControl, TextField } from '@mui/material'
import { fetcher } from '@/utilities/fetcher'

export default function PersonalData({ userData }) {
  console.log('userData', userData)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const handleUpdateInstructor = async (data: any) => {
    const url = `/instructors/${userData.instructor.id}`
    const res = await fetcher({ url, method: 'PUT', body: data })
    console.log(res)
  }

  const handleUpdateUser = async (data: any) => {
    console.log('Data from update', data)
    const url = `/users/${userData.id}`
    const res = await fetcher({ url, method: 'PUT', body: data })
    console.log(res)
    if (res.status === 201) {
      alert('User updated successfully')
    } else if (res.status === 500) {
      alert(res.error)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleUpdateUser)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '70%',
        margin: '0 auto'
      }}
    >
      <FormControl fullWidth>
        <TextField
       fullWidth
     type='email'
   label='Email'
 {...register('email')}
       placeholder={userData?.email}
     variant='outlined'
  />
      </FormControl>

      <FormControl fullWidth>
        <TextField fullWidth type='password' label='Password' {...register('password')} variant='outlined' />
      </FormControl>

      <FormControl fullWidth>
        <TextField
  fullWidth
type='password'
      label='Password Confirm'
    {...register('passwordConfirm')}
  variant='outlined'
       />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          fullWidth
          label='Phone Number'
          {...register('phoneNum')}
          placeholder={userData?.phoneNum}
          variant='outlined'
        />
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='submit' variant='contained'>
          Save Changes
        </Button>
      </div>
      {userData?.role === 'INSTRUCTOR' ||
        ('ADMIN' && (
          <Box
            component='form'
            onSubmit={handleSubmit(handleUpdateInstructor)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              margin: '0 auto'
            }}
          >
            <FormControl fullWidth>
              <TextField
                fullWidth
                label='CV Link'
                {...register('cvLink')}
                placeholder={userData?.cvLink}
                variant='outlined'
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label='National ID'
                {...register('nationalID')}
                placeholder={userData?.nationalID}
                variant='outlined'
              />
            </FormControl>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained'>
                Save Changes
              </Button>
            </div>
          </Box>
        ))}
    </Box>
  )
}
