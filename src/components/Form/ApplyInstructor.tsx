'use client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, FormControl, Typography, TextField, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/navigation'
import '../../styles/applyInstructor.css'

export const ApplyInstructor = () => {
  const { register, handleSubmit, control } = useForm()
  const [view, setView] = useState('view')
  const [cv, setCv] = useState('')
  const router = useRouter()
  const mediaQuery = useMediaQuery('(max-width: 800px)')

  const applyInstructor = async (data: any) => {
    const user = typeof window !== 'undefined' && localStorage.getItem('user')
    const userObj = JSON.parse(user)
    const userId = userObj.id
    data.userId = userId

    console.log(data)

    const url = 'http://localhost:3000/api/v1/instructors/'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })

    const result = await response.json()
    console.log(result)
    if (result.success) {
      router.push('/')
    }
  }

  return (
    <Box className='instructorApply'>
      {view === 'view' ? (
        <div>
          <Typography variant='h3'>
            Want To Join Our Team? <br /> Spread the knowledge and help students start their career?
          </Typography>
          <hr />
          <Typography variant='body1'>
            You&apos;re most welcomed! as We welcome passionate individuals who are eager to share their knowledge and
            contribute to the growth of aspiring professionals.
          </Typography>
          <Typography variant='h5'>Main Role of the Instructor: </Typography>
          <Typography variant='body1'>
            As an instructor, you will play a vital role in guiding and mentoring students, helping them to kickstart
            their career in the desired field. <br /> You will be responsible for creating and delivering high-quality
            content, providing constructive feedback, and supporting students in their learning journey.
          </Typography>
          <Typography variant='h5'>- Conditions and Rules</Typography>
          <ul>
            <Typography variant='body1'>
              <li>Hold relevant expertise and experience in the field.</li>
              <li>Commit to delivering high-quality instruction.</li>
              <li>Adhere to the platform&apos;`s code of conduct and policies.</li>
              <li>Provide constructive feedback and support to students.</li>
              <li>Work with the platform to ensure a smooth learning experience.</li>
            </Typography>
          </ul>
          <Typography variant='h6'>Apply Now</Typography>
          <Typography variant='body1'>
            To apply as an instructor, you need to provide your CV and National ID. You can either upload your CV or
            provide a link to it.
          </Typography>
          <div className='applyBtn'>
            <Button variant='contained' color='primary' onClick={() => setView('apply')}>
              Apply
            </Button>
          </div>
        </div>
      ) : (
        <div className='applyInstForm'>
          <div className='applyFormHeading'>
            <Typography variant='h3'>Apply Now</Typography>
            <Typography variant='body1'>
              We will be so glad to have you! please fill this form and wait for our response!
            </Typography>
          </div>
          <Box
            component='form'
            onSubmit={handleSubmit(applyInstructor)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <FormControl fullWidth>
              <TextField variant='outlined' {...register('cvLink')} type='text' label='CV Link' />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                name='cvLink'
                control={control}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <Button
                    variant='contained'
                    component='label'
                    sx={{
                      width: mediaQuery ? '8rem' : '12.5rem'
                    }}
                  >
                    {mediaQuery ? 'Upload CV' : 'Or Upload Your CV'}
                    <input
                      hidden
                      type='file'
                      onChange={e => {
                        onChange(e.target.files)
                        setCv(e.target.files[0].name)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      accept='.pdf,.doc,.docx'
                    />
                  </Button>
                )}
              />
              {cv}
            </FormControl>
            <div className='applybtnForm'>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
              <Button
                type='button'
                onClick={() => {
                  router.push('/')
                }}
                variant='text'
              >
                Cancel
              </Button>
            </div>
          </Box>
        </div>
      )}
    </Box>
  )
}
