'use client'
import React, { useState } from 'react'
import Layout from './pogressLayout'
import { Box, Button } from '@mui/material'
import CourseStepTwo from './components/CourseStepTwo'
import CourseStepThree from './components/CourseStepThree'
import CourseStepOne from './components/strep1/Step1Form'

const stepComponents = [<CourseStepOne key='1' />, <CourseStepTwo key='2' />, <CourseStepThree key='3' />]

export default function CourseCreationPage() {
  const [activeStep, setActiveStep] = useState(0)

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  return (
    <Layout activeStep={activeStep}>
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
    </Layout>
  )
}
