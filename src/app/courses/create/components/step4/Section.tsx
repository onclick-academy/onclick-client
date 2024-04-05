// components/Section.js
import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Lecture from './Lecture'

const Section = () => {
  const {
    control,
    register,
    formState: { errors }
  } = useFormContext()
  const { fields, append } = useFieldArray({
    control,
    name: 'sections'
  })

  return (
    <>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            border: 1,
            borderColor: 'grey.500',
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mb: 2,
            p: 2,
            '&:hover': {
              borderColor: 'grey.700',
              transition: 'border-color 0.3s'
            }
          }}
        >
          <TextField
            label='Section Title'
            {...register(`sections[${index}].title`)}
            variant='outlined'
            fullWidth
            error={!!errors.sections?.[index]?.title}
            helperText={errors.sections?.[index]?.title?.message}
          />
          <Lecture nestIndex={index} />
        </Box>
      ))}
      <Button variant='outlined' onClick={() => append({ title: '', lectures: [] })} startIcon={<AddIcon />}>
        Add Section
      </Button>
    </>
  )
}

export default Section
