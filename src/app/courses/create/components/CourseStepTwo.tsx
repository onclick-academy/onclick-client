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
      <Typography variant='h4' style={{marginBottom:"1rem", color: "rgba(66, 107, 219, 0.815)"}}>Patience is the key to your success journy</Typography>
      <Typography variant='h6' style={{marginBottom:"3rem", color: "rgba(55, 131, 194, 0.712)"}}>We will Notify you by Email with the final response to your request</Typography>
      <Typography variant='body1' style={{marginBottom:"3rem", padding:"6%", color: " rgba(55, 132, 194, 0.336)"}}>
        We highly recommend you to keep your hard work, encouraging you to do more of this amazing work! sustain your passion and keep going.
      </Typography>
      <Typography variant='h6' style={{marginBottom:"0.1rem", color: "rgba(55, 131, 194, 0.712)"}}>Thank you for your patience</Typography>
      <Typography variant='body2' style={{fontSize:"8px", color: " rgba(55, 132, 194, 0.336)"}}>All Copy Rights reserved &copy; @onclick.organization@gmail.com </Typography>
    </Box>
  )
}

export default CourseStepTwo
