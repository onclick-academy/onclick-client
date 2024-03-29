import * as React from 'react'
import { useForm, Controller, set } from 'react-hook-form'
import {
  Grid,
  Button,
  TextField,
  Chip,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Autocomplete
} from '@mui/material'
import { CourseI } from '@/types/course.type'
import CategoriesInput from './CategoriesInput'
import SkillsGained from './SkillsGained'
import { fetcher } from '@/utilities/fetcher'

interface TheFormI {
  defaultValues: CourseI | undefined
}

const TheForm = ({ defaultValues = undefined }: TheFormI) => {
  const { control, handleSubmit, register, setValue } = useForm<CourseI>({
    defaultValues: defaultValues
  })
  const [topics, setTopics] = React.useState<
    {
      id: string
      title: string
    }[]
  >([])

  const availableSkills = [
    'React',
    'Node.js',
    'CSS',
    'HTML',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'UI/UX',
    'Django'
  ]

  const handleSkillsChange = (_: any, newValue: string[]) => {
    // newValue is the new array of skills including both existing and newly added skills
    setValue('skillsGained', newValue)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    // reset(); // Consider where you want to call reset
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 1,
        minHeight: 'calc(100vh - 230px)'
      }}
    >
      <Grid container spacing={2} alignItems='flex-end'>
        <Grid item xs={12}>
          <TextField fullWidth label='Course Title' {...register('title')} variant='outlined' />
          <Typography variant='caption' color='textSecondary'>
            Your title should be a mix of attention-grabbing, informative, and optimized for search
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Course Description'
            {...register('description')}
            variant='outlined'
            multiline
            rows={3}
          />
          <Typography variant='caption' color='textSecondary'>
            Description should have minimum 200 words.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CategoriesInput control={control} />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControl fullWidth variant='outlined' size='small'>
            <Controller
              name='skillsGained'
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  freeSolo // Allows the addition of free solo entries (not from the dropdown)
                  options={availableSkills} // Initial options array
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant='outlined' label={option} {...getTagProps({ index })} key={index} />
                    ))
                  }
                  renderInput={params => (
                    <TextField {...params} variant='outlined' label='Skills Gained' placeholder='Add Skills' />
                  )}
                  onChange={handleSkillsChange}
                />
              )}
            />
          </FormControl>
          <Typography variant='caption' color='textSecondary'>
            Write what students will gain from your course (Maximum of 5 skills)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button type='submit' fullWidth variant='contained'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default TheForm

// TODO 1: add step2 with following fields:
{
  /* <Grid item xs={12} sm={6}>
  <Controller
    name='photo'
    control={control}
    render={({ field: { onChange, name } }) => (
      <Button variant='contained' component='label' fullWidth>
        Upload Photo
        <input
          hidden
          accept='image/*'
          type='file'
          onChange={e => {
            onChange(e.target.files)
          }}
          name={name}
        />
      </Button>
    )}
  />
</Grid> */
}

{
  /* <Grid item xs={12}>
  <TextField fullWidth label='Link to Intro Video (YouTube)' {...register('introVideo')} variant='outlined' />
</Grid> */
}
