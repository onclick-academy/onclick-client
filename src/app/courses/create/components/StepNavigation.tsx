import { Box, Button } from '@mui/material'
import React from 'react'

interface StepPropsI {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
}

const StepNavigation = ({ activeStep, handleBack, handleNext }: StepPropsI) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          mb: 2
        }}
      >
        <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant='outlined' onClick={handleNext}>
          {activeStep === 5 - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </>
  )
}

export default StepNavigation
