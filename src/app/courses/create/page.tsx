'use client'
import React, { useState } from 'react'
import CourseProgressLayout from './pogressLayout'
import { Box, Button } from '@mui/material'
import CourseStepTwo from './components/CourseStepTwo'
import CourseStepThree from './components/CourseStepThree'
import CourseStepOne from './components/step1/Step1Form'

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

  const stepComponents = [
    <CourseStepOne setActiveStep={setActiveStep} key='1' />,
    <CourseStepTwo key='2' setActiveStep={setActiveStep} />,
    <CourseStepThree key='3' setActiveStep={setActiveStep} />
  ]
  return (
    <CourseProgressLayout activeStep={activeStep}>
      <Box sx={{ width: 700, maxWidth: '90%' }}>{stepComponents[activeStep]}</Box>
    </CourseProgressLayout>
  )
}
