import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Grid, TextField, Button } from '@mui/material'
import { CourseI } from '@/types/course.type'
import CategoriesInput from './CategoriesInput'

interface TheFormI {
  defaultValues: CourseI | undefined
}

const TheForm = ({ defaultValues = undefined }: TheFormI) => {
  const { control, handleSubmit, register } = useForm<CourseI>({
    defaultValues: defaultValues
  })

  const onSubmit = (data: any) => {
    console.log(data)
    // reset(); // Consider where you want to call reset
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems='flex-end'>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label='Course Title' {...register('title')} variant='outlined' />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Course Description'
            {...register('description')}
            variant='outlined'
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <CategoriesInput control={control} />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label='Link to Intro Video (YouTube)' {...register('introVideo')} variant='outlined' />
        </Grid>

        {/* Assuming SkillsGained component is updated to fit Grid layout as well */}
        {/* <Grid item xs={12}>
          <SkillsGained control={control} />
        </Grid> */}

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
