import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Button, TextField, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material'
import StepNavigation from './StepNavigation'

// Define the form's data structure
interface FormData {
  coursePhoto: FileList
  introVideoOption: 'upload' | 'youtube'
  youtubeLink: string
  videoFile: FileList
}

const CourseStepTwo = ({
  setActiveStep
}: {
  setActiveStep: (activeStepUpdater: (prevActiveStep: number) => number) => void
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      coursePhoto: undefined,
      introVideoOption: 'upload',
      youtubeLink: '',
      videoFile: undefined
    }
  })
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const videoLink = watch('youtubeLink')
  const introVideoOption = watch('introVideoOption')

  useEffect(() => {
    // extract videoId from youtube link example= 'https://www.youtube.com/watch?v=lQclAUT8oRE&ab_channel=Yallacode
    if (videoLink && videoLink.includes('youtube.com')) {
      const videoId = videoLink.split('v=')[1].split('&')[0]
      console.log('🚀 ~ useEffect ~ videoId:', videoId)

      setSelectedVideo(`https://www.youtube.com/embed/${videoId}`)
    }
  }, [videoLink])

  const onSubmit = (data: FormData) => {
    console.log(data)
    const coursePhotoName = data.coursePhoto.length > 0 ? data.coursePhoto[0].name : ''
    let videoFileName = ''

    if (data.introVideoOption === 'upload' && data.videoFile && data.videoFile.length > 0) {
      videoFileName = data.videoFile[0].name
    }

    // Prepare the data object with file names to save in localStorage
    const dataToSave = {
      coursePhotoName,
      introVideoOption: data.introVideoOption,
      youtubeLink: data.introVideoOption === 'youtube' ? data.youtubeLink : '',
      videoFileName
    }

    // Save the data object as a JSON string in localStorage
    localStorage.setItem('step2', JSON.stringify(dataToSave))

    console.log('Saved data:', dataToSave)
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap={5} alignItems='flex-end'>
        {selectedPhoto && (
          <Grid item xs={12}>
            <img src={selectedPhoto} alt='Preview' style={{ marginTop: 10, width: '200px' }} />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h6'>Course Photo</Typography>
          <Typography color='textSecondary' className='caption' variant='caption'>
            Choose a photo that best represents your course
          </Typography>
          <Controller
            name='coursePhoto'
            control={control}
            rules={{ required: 'Course photo is required' }}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <>
                <Button
                  variant='outlined'
                  component='label'
                  fullWidth
                  sx={{
                    height: selectedPhoto ? 'auto' : 150,
                    mt: 2
                  }}
                >
                  {selectedPhoto ? 'Change photo' : 'Upload photo'}
                  <input
                    hidden
                    accept='image/*'
                    type='file'
                    onChange={e => {
                      onChange(e.target.files) // Notify useForm
                      if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader()
                        reader.onload = loadEvent => {
                          setSelectedPhoto(loadEvent.target?.result as string)
                        }
                        reader.readAsDataURL(e.target.files[0])
                      }
                    }}
                    onBlur={onBlur}
                    name={name}
                    ref={ref}
                  />
                </Button>
              </>
            )}
          />
          {errors.coursePhoto && (
            <Typography mt={1} color='error'>
              {errors.coursePhoto.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h6'>Course Introduction Video</Typography>
          <Controller
            name='introVideoOption'
            control={control}
            render={({ field }) => (
              <>
                <Typography color='textSecondary' className='caption'>
                  The video should be less than 5 minutes long, <br /> you have the option to upload a video or link a
                  to YouTube video
                </Typography>
                <RadioGroup
                  sx={{
                    mt: 2,
                    mb: 1
                  }}
                  {...field}
                  onChange={e => {
                    field.onChange(e.target.value)
                    setSelectedVideo(null)
                    setValue('youtubeLink', '')
                  }}
                  row
                >
                  <FormControlLabel value='upload' control={<Radio />} label='Upload Video' />
                  <FormControlLabel value='youtube' control={<Radio />} label='YouTube Link' />
                </RadioGroup>
              </>
            )}
          />

          {selectedVideo && introVideoOption === 'upload' && (
            <Grid item xs={12}>
              <video controls style={{ width: '100%', maxWidth: '700px' }}>
                <source src={selectedVideo} />
              </video>
            </Grid>
          )}

          {introVideoOption === 'upload' && (
            <>
              <Controller
                name='videoFile'
                control={control}
                rules={{ required: 'Video is required' }}
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <Button
                    variant='outlined'
                    component='label'
                    fullWidth
                    sx={{
                      height: selectedVideo ? 'auto' : 150
                    }}
                  >
                    {selectedVideo ? 'Change video' : 'Upload video'}
                    <input
                      hidden
                      accept='video/*'
                      type='file'
                      onChange={e => {
                        onChange(e.target.files) // Notify useForm
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader()
                          reader.onload = loadEvent => {
                            setSelectedVideo(loadEvent.target?.result as string)
                          }
                          reader.readAsDataURL(e.target.files[0])
                        }
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                    />
                  </Button>
                )}
              />
            </>
          )}
          {errors.introVideoOption && (
            <Typography mt={1} color='error'>
              {errors.introVideoOption.message}
            </Typography>
          )}
          {introVideoOption === 'youtube' && (
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {videoLink && (
                <Grid item xs={12}>
                  <iframe
                    width='100%'
                    height='315'
                    src={`${selectedVideo}`}
                    title='YouTube video player'
                    frameBorder={0}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </Grid>
              )}
              <Controller
                name='youtubeLink'
                control={control}
                rules={{ required: 'YouTube link is required' }}
                render={({ field }) => (
                  <>
                    <TextField {...field} fullWidth label='YouTube Link' variant='outlined' />
                    {errors.youtubeLink && (
                      <Typography mt={1} color='error'>
                        {errors.youtubeLink.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Box>
          )}
        </Grid>
        <StepNavigation
          activeStep={1}
          handleBack={() => {
            setActiveStep((prevActiveStep: number) => prevActiveStep - 1)
          }}
          handleNext={handleSubmit(onSubmit)}
        />
      </Grid>
    </form>
  )
}

export default CourseStepTwo
