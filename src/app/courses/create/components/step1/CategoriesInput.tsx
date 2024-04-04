import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Box, Grid, Chip, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { fetcher } from '@/utilities/fetcher'
import { CategoryI, SubCategoryI, TopicI } from '../../page'

interface CategoriesInputPropsI {
  control: any // Consider using a more specific type for control
  setValue: any
}

const CategoriesInput = ({ control, setValue }: CategoriesInputPropsI) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [categories, setCategories] = useState<CategoryI[]>([])
  const [subcategories, setSubcategories] = useState<SubCategoryI[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [topics, setTopics] = useState<TopicI[]>([])
  const [error, setError] = useState<{ [key: string]: string }>({
    category: '',
    subcategories: '',
    topics: ''
  })

  const t = {
    title: 'Title',
    description:
      'Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description Description ',
    skillsGained: '',
    category: '7477fded-1418-4ff5-9fad-d9f70345c12f',
    subcategories: [
      'd103f198-2774-4147-9359-d76325480c15',
      '8c53fe41-f0a2-45ba-b98a-e7569b60822f',
      '37705b8d-3658-4a2f-9ee2-67a5c6c8e355'
    ],
    topics: [
      'f2bd9f69-ca9c-4e19-867b-f75de6232c57',
      'd99364ba-d285-4ecd-a347-d45af561d22f',
      '1d33639a-786e-4e37-89d5-1bcaa468bd8d'
    ]
  }

  useEffect(() => {
    const defaultValues = localStorage.getItem('step1')
    if (defaultValues) {
      const { category, subcategories, topics } = JSON.parse(defaultValues)
      setSelectedCategory(category)
      setSelectedSubcategories(subcategories)
      setValue('topics', topics)
    }
    const fetchCategories = async () => {
      const response = await fetcher({ url: '/categories' })
      if (response.data) {
        setCategories(response.data)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory)
      if (category) {
        setSubcategories(category.subCategories || [])
      }
    } else {
      setSubcategories([])
      setTopics([]) // Clear topics when no category is selected
    }
  }, [selectedCategory, categories])

  useEffect(() => {
    const fetchTopics = async () => {
      // Reset topics state for a new set of subcategories
      let allTopics: TopicI[] = []
      for (const subcategoryId of selectedSubcategories) {
        const topicsResponse = await fetcher({ url: `/topics/all/${subcategoryId}` })
        if (topicsResponse.data) {
          allTopics = [...allTopics, ...topicsResponse.data]
        }
      }
      // Deduplicate topics based on title after collecting all
      const uniqueTopics = Array.from(new Set(allTopics.map(topic => topic.title))).map(
        title => allTopics.find(topic => topic.title === title)!
      )
      setTopics(uniqueTopics)
    }

    if (selectedSubcategories && selectedSubcategories.length > 0) {
      fetchTopics()
    } else {
      setTopics([]) // Clear topics when no subcategory is selected
    }
  }, [selectedSubcategories])

  // Handler for subcategory changes
  const handleSubcategoryChange = (event: any) => {
    const { value } = event.target // Directly set the selected subcategories
    if (value.length > 3) {
      setError({ ...error, subcategories: 'You can only select up to 3 subcategories' })
      return
    }
    setSelectedSubcategories(value)
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth margin='normal'>
          <InputLabel>Category</InputLabel>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <>
                <Select
                  {...field}
                  label='Category'
                  onChange={e => {
                    // init all subcategories and topics states
                    setValue('subcategories', [])
                    setValue('topics', [])
                    setSelectedSubcategories([])
                    setTopics([])
                    field.onChange(e.target.value)
                    setSelectedCategory(e.target.value)
                  }}
                  value={field.value || ''}
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
                {error.category ? (
                  <Typography color='error'>{error.category}</Typography>
                ) : (
                  <Typography color='textSecondary' className='caption'>
                    Category should be related to the course content, please select the mopst fitting category
                  </Typography>
                )}
              </>
            )}
          />
        </FormControl>
      </Grid>

      {selectedCategory && (
        <Grid item xs={12}>
          {error.subcategories && <Typography color='error'>{error.subcategories}</Typography>}
          <FormControl fullWidth margin='normal'>
            <InputLabel>Subcategory</InputLabel>
            <Controller
              name='subcategories'
              control={control}
              rules={{ required: 'Subcategories is required' }}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    label='Subcategory'
                    multiple
                    onChange={event => {
                      // init topics state
                      setError({ ...error, subcategories: '' })
                      setValue('topics', [])
                      field.onChange(event.target.value)
                      handleSubcategoryChange(event)
                    }}
                    value={field.value || []}
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value: string) => {
                          console.log(selectedSubcategories)
                          return <Chip key={value} label={subcategories.find(sub => sub.id === value)?.name || value} />
                        })}
                      </Box>
                    )}
                  >
                    {subcategories.map(sub => (
                      <MenuItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography color='textSecondary' className='caption'>
                    Select the subcategories that best fit your course content (max 3)
                  </Typography>
                </>
              )}
            />
          </FormControl>
        </Grid>
      )}

      {topics.length > 0 && (
        <Grid item xs={12}>
          {error && <Typography color='error'>{error.topics}</Typography>}
          <FormControl fullWidth margin='normal'>
            <InputLabel>Topics</InputLabel>
            <Controller
              name='topics'
              control={control}
              rules={{ required: 'Topics is required' }}
              render={({ field }) => (
                <>
                  <Select
                    multiple
                    {...field}
                    label='Topics'
                    onChange={event => {
                      const {
                        target: { value }
                      } = event
                      setError({ ...error, topics: '' })
                      if (value.length > 3) {
                        setError({ ...error, topics: 'You can only select up to 3 topics' })
                        return
                      }
                      field.onChange(typeof value === 'string' ? value.split(',') : value)
                    }}
                    renderValue={selected => (
                      <Box>
                        {selected.map((value: any) => {
                          console.log('🚀 ~ {topics.map ~ value:', value)
                          console.log('🚀 ~ {topics.map ~ topics:', topics)
                          return (
                            <Chip
                              variant='outlined'
                              key={value.id}
                              label={topics.find(topic => topic.id === value)?.title || value}
                            />
                          )
                        })}
                      </Box>
                    )}
                    value={field.value || []}
                  >
                    {topics.map(topic => (
                      <MenuItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </MenuItem>
                    ))}
                  </Select>

                  <Typography color='textSecondary' className='caption'>
                    Select the topics that best fit your course content (max 3)
                  </Typography>
                </>
              )}
            />
          </FormControl>
        </Grid>
      )}
    </>
  )
}

export default CategoriesInput
