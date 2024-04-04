import { Box, Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface StepPropsI {
  activeStep: number
  handleBack: () => void
  handleNext: () => void
}

const StepNavigation = () => {
  const params = useSearchParams()
  const router = useRouter()
  const activeStep = parseInt(params.get('step') || '0')

  const handleBack = () => {
    router.push(`/courses/create?step=${activeStep - 1}`)
  }
  const handleNext = () => {
    router.push(`/courses/create?step=${activeStep + 1}`)
  }
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
