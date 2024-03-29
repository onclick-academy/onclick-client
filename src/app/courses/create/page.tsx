'use client'
import React, { useState } from 'react'
import CourseProgressLayout from './pogressLayout'
import { Box, Button } from '@mui/material'
import CourseStepTwo from './components/CourseStepTwo'
import CourseStepThree from './components/CourseStepThree'
import CourseStepOne from './components/strep1/Step1Form'
import { fetcher } from '@/utilities/fetcher'

export interface TopicI {
  id: string
  title: string
}
export interface SubCategoryI {
  id: string
  name: string
  topics: TopicI[]
}
export interface CategoryI {
  id: string
  title: string
  description: string
  photo: string
  subCategories: SubCategoryI[]
}

export default function CourseCreationPage() {
  const [activeStep, setActiveStep] = useState(0)

  const stepComponents = [<CourseStepOne key='1' />, <CourseStepTwo key='2' />, <CourseStepThree key='3' />]

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  return (
    <CourseProgressLayout activeStep={activeStep}>
      <Box sx={{ width: 700, maxWidth: '90%' }}>
        {stepComponents[activeStep]}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2
          }}
        >
          <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Button onClick={handleNext}>{activeStep === stepComponents.length - 1 ? 'Finish' : 'Next'}</Button>
        </Box>
      </Box>
    </CourseProgressLayout>
  )
}

// export async function load() {
//   const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/categories')

//   // Ensure the response is OK and then parse the JSON body
//   if (!response.ok) {
//     throw new Error('Failed to fetch categories')
//   }
//   const categories = await response.json()

//   return {
//     props: {
//       categories
//     }
//   }
// }
