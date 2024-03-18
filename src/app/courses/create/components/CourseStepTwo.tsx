'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'

const CourseStepTwo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        width: '100%',
        margin: 'auto',
        padding: '4%',
      }}
    >
      <Typography variant='h4' sx={{mb:"1rem"}}>Patience is the key to your success journy</Typography>
      <Typography variant='h6' sx={{mb:"3rem"}}>We will Notify you by Email with the final response to your request</Typography>
      <Typography variant='body1' sx={{mb:"3rem", p:"6%"}}>
        We highly recommend you to keep your hard work, encouraging you to do more of this amazing work! sustain your passion and keep going.
      </Typography>
      <Typography variant='h6' sx={{mb:"0.1rem"}}>Thank you for your patience</Typography>
      <Typography variant='body2' sx={{fontSize:"8px"}}>All Copy Rights reserved &copy; @onclick.organization@gmail.com </Typography>
    </Box>
  )
}

export default CourseStepTwo
