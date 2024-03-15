// Import necessary components and hooks from MUI and react-hook-form
import * as React from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip
} from '@mui/material';
import Image from 'next/image';

// Define the props for your categories, subcategories, and topics
interface FormInput {
  photo: FileList;
  courseTitle: string;
  subTitle: string;
  courseDescription: string;
  categories: string;
  subcategories: string[];
  topics: string[];
  skills: string[];
  videoLink: string;
}

export default function CourseStepOne() {
  const [photo, setPhoto] = React.useState('');
  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormInput>();
  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  const skills = watch('skills') || [];

  // TODO: handel what if instructor get back and edit hgis data -
  // TODO: we nust use default values is already exist

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          gap: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'flex-end'
          }}
        >
          {photo && (
            <Box
              sx={{
                width: '12.5rem',
                height: '12.5rem',
                borderRadius: '50%',
                overflow: 'hidden'
              }}
            >
              <Image
                src={photo}
                alt='course photo'
                width={200}
                height={200}
              />
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
                    setPhoto(URL.createObjectURL(e.target.files[0]));
                    onChange(e.target.files);
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
          <TextField
            fullWidth
            label='Course Title'
            {...register('courseTitle')}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Subtitle'
            {...register('subTitle')}
            variant='outlined'
          />
        </Box>
      </Box>

      <TextField
        fullWidth
        label='Course Description'
        {...register('courseDescription')}
        variant='outlined'
        multiline
        rows={4}
      />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label='Category'
            >
              <MenuItem value='Category 1'>Category 1</MenuItem>
              <MenuItem value='Category 2'>Category 2</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      <TextField
        fullWidth
        label='Link to Intro Video (YouTube)'
        {...register('videoLink')}
        variant='outlined'
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
