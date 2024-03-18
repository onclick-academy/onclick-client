import * as React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  ListItemText,
  Chip
} from '@mui/material'
import Image from 'next/image'
import { CourseI } from '@/types/course.type'
import SkillsGained from './components/SkillsGained'

interface TheFormI {
  defaultValues: CourseI | undefined
}

const categoriesData = [
  {
    id: 'cat1',
    name: 'Category 1',
    subCategories: [
      { id: 'sub1', name: 'Sub Category 1' },
      { id: 'sub2', name: 'Sub Category 2' }
    ]
  },
  {
    id: 'cat2',
    name: 'Category 2',
    subCategories: [
      { id: 'sub3', name: 'Sub Category 3' },
      { id: 'sub4', name: 'Sub Category 4' }
    ]
  }
]

const TheForm = ({ defaultValues = undefined }: TheFormI) => {
  const [photo, setPhoto] = React.useState('')
  const [skills, setSkills] = React.useState([])
  const [subCategoriesOptions, setSubCategoriesOptions] = React.useState([])

  const { control, handleSubmit, register, watch, reset } = useForm<CourseI>({
    defaultValues: defaultValues
  })

  const skill = watch('skillsGained')
  const categoriesSelection = watch('categories')
  React.useEffect(() => {
    const relatedSubCategories = categoriesData
      .filter(category => categoriesSelection?.includes(category.id))
      .flatMap(category => category.subCategories)

    setSubCategoriesOptions(relatedSubCategories)
  }, [categoriesSelection])

  const onSubmit = data => {
    console.log(data)
    reset()
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <Box
        className='flex gap-2'
        sx={{
          flexDirection: 'row-reverse'
        }}
      >
        <Box
          className='flex flex-column gap-2'
          sx={{
            justifyContent: 'flex-end'
          }}
        >
          {photo && (
            <Box className='course-avatar'>
              <Image src={photo} alt='course photo' width={200} height={200} />
            </Box>
          )}
          <Controller
            name='photo'
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <Button
                variant='contained'
                component='label'
                sx={{
                  width: '12.5rem'
                }}
              >
                Upload Photo
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  onChange={e => {
                    setPhoto(URL.createObjectURL(e.target.files[0]))
                    onChange(e.target.files)
                  }}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                />
              </Button>
            )}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'flex-end',
            gap: 2
          }}
        >
          <TextField fullWidth label='Course Title' {...register('title')} variant='outlined' />

          <TextField
            fullWidth
            label='Course Description'
            {...register('description')}
            variant='outlined'
            multiline
            rows={4}
          />
        </Box>
      </Box>

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <Select {...field} label='Category' value={Array.isArray(field.value) ? field.value : []} multiple>
              {categoriesData.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  <Chip label={category.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sub Category</InputLabel>
        <Controller
          name='subCategories'
          control={control}
          render={({ field }) => (
            <Select {...field} label='Sub Category' value={Array.isArray(field.value) ? field.value : []} multiple>
              {subCategoriesOptions.map(subCategory => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  <Chip label={subCategory.name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <TextField fullWidth label='Link to Intro Video (YouTube)' {...register('introVideo')} variant='outlined' />

      <SkillsGained formHook={{ register, reset }} skill={skill} skills={skills} setSkills={setSkills} />

      <TextField fullWidth label='Certificate' {...register('certificate')} variant='outlined' />

      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </Box>
  )
}
// TODO make new componenet for skills and categories

export default TheForm
