import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Box, Grid, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { fetcher } from '@/utilities/fetcher'
import { CategoryI, SubCategoryI, TopicI } from '../../page'

interface CategoriesInputPropsI {
  control: any // Consider using a more specific type for control
}

const CategoriesInput = ({ control }: CategoriesInputPropsI) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [categories, setCategories] = useState<CategoryI[]>([])
  const [subcategories, setSubcategories] = useState<SubCategoryI[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]) // Track selected subcategories
  const [topics, setTopics] = useState<TopicI[]>([])

  useEffect(() => {
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
      if (category && category.subCategories) {
        setSubcategories(category.subCategories)
      } else {
        // If there are no subcategories for the selected category, clear the subcategories.
        setSubcategories([])
      }
    }

    if (selectedSubcategories.length > 0) {
      for (const subcategoryId of selectedSubcategories) {
        const subcategory = subcategories.find(sub => sub.id === subcategoryId)
        console.log('subcategory', subcategory)
        if (subcategory && subcategory.topics) {
          setTopics(subcategory.topics)
        }
      }
    }
  }, [selectedCategory, categories, selectedSubcategories, subcategories])

  // Handler to update selected subcategories and potentially fetch topics
  const handleSubcategoryChange = (event: any) => {
    const value = event.target.value
    setSelectedSubcategories(value)
  }

  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label='Category'
                onChange={e => {
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
            )}
          />
        </FormControl>
      </Grid>

      {selectedCategory && (
        <Grid item xs={12}>
          <FormControl fullWidth margin='normal'>
            <InputLabel>Subcategory</InputLabel>
            <Controller
              name='subcategories'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label='Subcategory'
                  multiple
                  onChange={event => {
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
              )}
            />
          </FormControl>
        </Grid>
      )}

      {topics.length > 0 && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Topics</InputLabel>
            <Controller
              name='categories'
              control={control}
              render={({ field }) => (
                <Select
                  multiple
                  {...field}
                  label='Topics'
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {topics.map((value: any) => {
                        console.log('value', value)
                        return (
                          <Chip
                            variant='outlined'
                            key={value}
                            label={topics.find(sub => sub.id === value)?.title || value}
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
              )}
            />
          </FormControl>
        </Grid>
      )}
    </>
  )
}

export default CategoriesInput
