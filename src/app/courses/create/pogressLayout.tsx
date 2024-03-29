'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

interface CourseProgressLayoutI {
  children: React.ReactNode
  activeStep: number
}

const steps = ['Keywords', 'Media', 'Review', 'Upload', 'Finish']
export default function CourseProgressLayout({ children, activeStep }: CourseProgressLayoutI) {
  return (
    <>
      <Box sx={{ width: '100%', marginBlock: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 5
        }}
      >
        {children}
      </Box>
    </>
  )
}
