import React, { useState } from 'react'
import { Button, Container, Typography, CircularProgress, Box, Snackbar, Alert } from '@mui/material'

const CourseStepFive = () => {
  const handlePublishCourse = async () => {
    console.log('Course published')
  }

  return (
    <Container>
      <Typography
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        variant='h4'
        sx={{ mt: 20, mb: 4 }}
      >
        Your course has been uploaded successfully!
      </Typography>
      <Typography variant='h6' sx={{ mt: 2, mb: 4 }}>
        Your course is now under review. This process usually takes around 1 hour. You can check the status of your
        course in the dashboard.
      </Typography>

      <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
        <Button variant='contained' color='primary' onClick={handlePublishCourse}>
          {'Publish Course'}
        </Button>
      </Box>
    </Container>
  )
}

export default CourseStepFive
