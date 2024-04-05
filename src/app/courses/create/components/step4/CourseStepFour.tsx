// pages/app/course-editor.js
import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Container, Typography } from '@mui/material'
import Section from './Section'
import { launch } from './handleSubmit'
import { useSearchParams } from 'next/navigation'
import { fetcher } from '@/utilities/fetcher'

export default function CourseEditor() {
  const methods = useForm({
    defaultValues: {
      sections: [
        {
          title: 'Introduction...',
          lectures: [
            {
              title: 'Introduction Lecture...',
              description: 'Some description about your lecture...',
              video: null,
              thumbnail: ''
            }
          ]
        }
      ]
    }
  })

  const params = useSearchParams()
  const courseId = params.get('course_id')

  useEffect(() => {
    if (!courseId) window.location.href = '/courses/create?step=2'
    const isApproved = async () => {
      try {
        const courseData = await fetcher({
          url: `/courses/${courseId}`
        })
        if (!courseData.data.isApproved) {
          window.location.href = '/courses/create?step=2'
        }
        console.log('🚀 ~ fetchCourse ~ courseData:', courseData.data.createdBy)
      } catch (error) {
        console.error('Error fetching course:', error)
      }
    }

    isApproved()
  }, [courseId])
  const onSubmit = data => {
    console.log(data)
    launch(data, courseId)
  }

  return (
    <Container>
      <Typography
        variant='h5'
        sx={{
          mt: 2,
          mb: 4
        }}
      >
        Start putting together your course by creating sections and lectures.
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Section />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{
              ml: 2,
              my: 3
            }}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
