import React from 'react'
import { Button, Typography, Box, Container, Paper } from '@mui/material'
import { fetcher } from '@/utilities/fetcher'
import getAuthUser from '@/utilities/getAuthUser'
import { useRouter } from 'next/navigation'
import { LoadingButton } from '@mui/lab'

const CourseStepThree = ({ step }: { step: number }) => {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const handleBack = () => {
    // Allows the user to edit course information
    router.push(`/courses/create?step=${step - 1}`)
  }
  const submitted = localStorage.getItem('submitted')

  const handleSubmit = async () => {
    console.log('Course submitted for review')
    const step1 = localStorage.getItem('step1')
    const step2 = localStorage.getItem('step2')

    const data = {
      ...JSON.parse(step1 as string),
      ...JSON.parse(step2 as string)
    }
    const sendCourse = async () => {
      try {
        setLoading(true)
        const instructor = await getAuthUser()
        const dataToSend = {
          createdBy: instructor.data.instructor.id,
          title: data.title,
          description: data.description,
          skillsGained: data.skillsGained,
          categoryId: data.category,
          price: +data.price,
          photo: data.coursePhotoName || 'test.png',
          introVideo:
            data.introVideoOption === 'upload'
              ? 'https://www.youtube.com/watch?v=lQclAUT8oRE&ab_channel=Yallacode'
              : data.youtubeLink,
          subCategories: data.subcategories,
          topics: data.topics
        }
        console.log('🚀 ~ sendCourse ~ instructor:', instructor, dataToSend)
        const res = await fetcher({
          url: '/courses',
          method: 'POST',
          body: dataToSend
        })
        setLoading(false)

        localStorage.setItem('submitted', 'true')
        console.log('🚀 ~ sendCourse ~ res:', res)
      } catch (error) {
        console.log('error', error)
      }
    }
    await sendCourse()
  }

  return (
    <Box
      sx={{
        mt: 4,
        height: '400px'
      }}
    >
      {submitted ? (
        <>
          <Typography variant='h2' gutterBottom color='primary.main'>
            Course Submitted for Review
          </Typography>
          <Typography variant='h6' paragraph>
            Your course is now under review. This process usually takes around 1 hour. You can check the status of your
            course in the dashboard.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
            <Button variant='contained' color='secondary' onClick={() => router.push('/')}>
              Go to Home
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ mt: 4, height: '400px' }}>
            <Typography variant='h2' gutterBottom color='primary.main'>
              Ready to Launch Your Course?
            </Typography>
            <Typography variant='h6' paragraph>
              You&apos;re just one step away! Submitting now will send your course to our team for a quick review. While
              it&apos;s being reviewed, you won&apos;t be able to make further edits.
            </Typography>
            <Typography variant='h6' paragraph>
              Don&apos;t worry, this isn&apos;t the final step. Once approved, you&apos;ll move on to adding your
              lectures and bringing your course to life.
            </Typography>
            <Typography variant='body2' paragraph sx={{ fontStyle: 'italic' }}>
              Tip: Make sure everything&apos;s just right before you submit. You can go back and review if needed.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
              <Button variant='contained' color='secondary' onClick={handleBack}>
                Review Course
              </Button>
              <LoadingButton loading={loading} variant='contained' color='primary' onClick={handleSubmit}>
                Submit for Review
              </LoadingButton>
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default CourseStepThree
