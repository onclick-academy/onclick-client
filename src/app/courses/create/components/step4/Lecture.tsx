// components/Lecture.js
import React, { useEffect, useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Box, Button, TextField, LinearProgress, Grid, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import axios from 'axios'
import CancelIcon from '@mui/icons-material/Cancel'
import { useSearchParams } from 'next/navigation'
import { fetcher } from '@/utilities/fetcher'
import getAuthUser from '@/utilities/getAuthUser'

const Lecture = ({ nestIndex }) => {
  const {
    control,
    register,
    setValue,
    formState: { errors }
  } = useFormContext() // retrieve all hook methods
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections[${nestIndex}].lectures`
  })
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploading, setUploading] = useState({})
  const [cancelTokenSource, setCancelTokenSource] = useState(null)
  const [courseData, setCourseData] = useState(null)
  const [videoDurations, setVideoDurations] = useState({})

  const params = useSearchParams()
  const courseId = params.get('course_id')

  const fetch = async () => {
    try {
      const courseData = await fetcher({
        url: `/courses/${courseId}`
      })
      console.log('🚀 ~ fetchCourse ~ courseData:', courseData.data.createdBy)
      setCourseData(courseData)
    } catch (error) {
      console.error('Error fetching course:', error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleFileUpload = (file, lectureIndex) => {
    const formData = new FormData()
    formData.append('video', file)

    let duration

    if (file && file.type.startsWith('video/')) {
      const videoElement = document.createElement('video')
      videoElement.src = URL.createObjectURL(file)

      videoElement.addEventListener('loadedmetadata', () => {
        console.log('Duration:', videoElement.duration) // Correct place to log the duration
        setVideoDurations(prevDurations => ({
          ...prevDurations,
          [lectureIndex]: videoElement.duration
        }))
        duration = videoElement.duration // Now duration will have the correct value, but only within this callback

        URL.revokeObjectURL(videoElement.src) // Clean up the URL
      })
    }

    const source = axios.CancelToken.source()

    const fileURL = `https://onclick-cf.omak.workers.dev/${courseData.data.createdBy}/course-${courseId}/section-${nestIndex}/lecture-${lectureIndex}`

    setUploading(prevUploading => ({
      ...prevUploading,
      [lectureIndex]: true // Correctly set uploading state for this lecture
    }))

    setUploadProgress(prevProgress => ({
      ...prevProgress,
      [lectureIndex]: 0 // Initialize progress for this lecture
    }))

    axios({
      method: 'PUT',
      url: fileURL,
      data: formData,
      headers: {
        'X-Custom-Auth-Key': 'a223adbe-48c9-4a90-967b-838f6139ddd8'
      },
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(prevProgress => ({
          ...prevProgress,
          [lectureIndex]: percentCompleted // Update progress for this lecture
        }))
      },
      cancelToken: source.token
    })
      .then(response => {
        setUploading(prevUploading => ({
          ...prevUploading,
          [lectureIndex]: false // Set uploading false for this lecture
        }))

        if (response.status === 200) {
          console.log('File uploaded successfully', response.data)
          setValue(`sections[${nestIndex}].lectures[${lectureIndex}].video`, fileURL)
          setValue(`sections[${nestIndex}].lectures[${lectureIndex}].duration`, duration)
        }
      })
      .catch(error => {
        setUploading(prevUploading => ({
          ...prevUploading,
          [lectureIndex]: false // Ensure uploading is set to false in case of error
        }))
      })
  }

  const handleCancelUpload = k => {
    cancelTokenSource.cancel('Upload cancelled')
    setUploading(prevUploading => ({ ...prevUploading, [k]: false }))
  }

  return (
    <Box>
      {fields.map((item, k) => (
        <Grid
          container
          key={item.id}
          sx={{
            border: 1,
            borderColor: 'grey.500',
            borderRadius: 1,
            gap: 2,
            mb: 2,
            p: 2,
            '&:hover': {
              borderColor: 'grey.700',
              transition: 'border-color 0.3s'
            }
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label='Lecture Title'
              {...register(`sections[${nestIndex}].lectures[${k}].title`)}
              variant='outlined'
              fullWidth
              error={!!errors.sections?.[nestIndex]?.lectures?.[k]?.title}
              helperText={errors.sections?.[nestIndex]?.lectures?.[k]?.title?.message}
            />
          </Grid>
          <Grid item xs={12} sm={5} ml={4}>
            <TextField
              label='Lecture Order'
              {...register(`sections[${nestIndex}].lectures[${k}].order`)}
              variant='outlined'
              type='number'
              fullWidth
              error={!!errors.sections?.[nestIndex]?.lectures?.[k]?.title}
              helperText={errors.sections?.[nestIndex]?.lectures?.[k]?.title?.message}
            />
          </Grid>
          <TextField
            label='Description'
            {...register(`sections[${nestIndex}].lectures[${k}].description`)}
            variant='outlined'
            fullWidth
            multiline
            rows={2}
            error={!!errors.sections?.[nestIndex]?.lectures?.[k]?.description}
            helperText={errors.sections?.[nestIndex]?.lectures?.[k]?.description?.message}
          />
          {/* Include input fields for video and thumbnail */}
          <TextField
            label='Video'
            InputLabelProps={{ shrink: true }}
            type={'file'}
            onChange={e => handleFileUpload((e.target as HTMLInputElement).files[0], k)} // Adjusted line
            name={`sections[${nestIndex}].lectures[${k}].video`} // Adjusted line
            variant='outlined'
            fullWidth
          />
          {uploading[k] && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant='determinate' value={uploadProgress[k]} />
              {/* <IconButton onClick={() => handleCancelUpload(k)}>
                <CancelIcon />
              </IconButton> */}
            </Box>
          )}
          <Button type='button' onClick={() => remove(k)}>
            Remove Lecture
          </Button>
        </Grid>
      ))}
      <Button type='button' onClick={() => append({ title: '', description: '' })} startIcon={<AddCircleOutlineIcon />}>
        Add Lecture
      </Button>
    </Box>
  )
}

export default Lecture

const dumm = {
  sections: [
    {
      title: 'Introduction...',
      lectures: [
        {
          title: 'Introduction Lecture...',
          description: 'Some description about your lecture...',
          video:
            'https://onclick-cf.omak.workers.dev/b9e11894-2be0-483e-9a25-e16060456527/course-466b47fa-9872-4c8c-a2d6-b5a52af85bf8/section-0/lecture-0',
          thumbnail: '',
          order: '0'
        },
        {
          title: 'Lecture 2',
          description:
            'LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 LECTURE 2 ',
          order: '1',
          video:
            'https://onclick-cf.omak.workers.dev/b9e11894-2be0-483e-9a25-e16060456527/course-466b47fa-9872-4c8c-a2d6-b5a52af85bf8/section-0/lecture-1'
        }
      ]
    },
    {
      title: 'Section2',
      lectures: [
        {
          title: 'lecture 1 in section 2',
          description:
            'lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one lecture one ',
          order: '1',
          video:
            'https://onclick-cf.omak.workers.dev/b9e11894-2be0-483e-9a25-e16060456527/course-466b47fa-9872-4c8c-a2d6-b5a52af85bf8/section-1/lecture-0'
        }
      ]
    }
  ]
}
