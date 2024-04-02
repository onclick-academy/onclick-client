import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, Button, TextField, Chip, Typography, FormControl, Autocomplete } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { CourseI } from '@/types/course.type'
import CategoriesInput from './CategoriesInput'
import './style.scss'

interface TheFormI {
  setActiveStep: any
}

const TheForm = ({ setActiveStep }: TheFormI) => {
  const [init, setInit] = React.useState<CourseI | null>(null)
  const [skills, setSkills] = React.useState<string[]>([])

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isLoading }
  } = useForm<CourseI>({
    defaultValues: async () => {
      const values = localStorage.getItem('step1')
      console.log('values', values)
      if (values) {
        setInit(JSON.parse(values))
      }
      return values ? JSON.parse(values) : {}
    }
  })

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
    setValue('skillsGained', newValue)
    setSkills(prev => [...prev, ...newValue])
  }

  const onSubmit = (data: CourseI) => {
    localStorage.setItem(
      'step1',
      JSON.stringify({
        ...data,
        skillsGained: skills
      })
    )
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
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
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label='Course Title'
            {...register('title')}
            variant='outlined'
          />
          <Typography color='textSecondary' className='caption'>
            Your title should be a mix of attention-grabbing, informative, and optimized for search
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label='Course Description'
            {...register('description', { required: true, minLength: 200 })}
            variant='outlined'
            multiline
            rows={3}
            error={Boolean(errors.description)}
            helperText={errors.description && 'Description should have minimum 200 words.'}
          />
          <Typography color='textSecondary' className='caption'>
            Write a brief description of your course (Minimum of 200 words)
          </Typography>
        </Grid>

        <CategoriesInput setValue={setValue} control={control} />

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant='outlined' size='small'>
            <Controller
              name='skillsGained'
              control={control}
              // rules={{ required: 'Skills Gained is required' }}
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
                    <TextField
                      {...params}
                      {...register('skillsGained')}
                      InputLabelProps={{ shrink: true }}
                      variant='outlined'
                      label='Skills Gained'
                      placeholder='Add Skills'
                    />
                  )}
                  defaultValue={init?.skillsGained || []}
                  onChange={handleSkillsChange}
                />
              )}
            />
          </FormControl>
          <Typography variant='caption' className='caption' color='textSecondary'>
            Write what students will gain (Max of 5 skills)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label='Price'
            {...register('price', { required: true })}
            variant='outlined'
            rows={3}
            error={Boolean(errors.price)}
            helperText={errors.price && 'Price is required'}
          />
          <Typography color='textSecondary' className='caption'>
            How much does your course cost?
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            my: 3
          }}
        >
          <LoadingButton
            loading={isLoading}
            sx={{
              width: 100
            }}
            type='submit'
            fullWidth
            variant='outlined'
          >
            Next
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  )
}

export default TheForm
