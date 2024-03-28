import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { fetcher } from '@/utilities/fetcher'
import { CategoryI, SubCategoryI } from '../../page'

interface CategoriesInputPropsI {
  control: any
}

const CategoriesInput = ({ control }: CategoriesInputPropsI) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [categories, setCategories] = useState<CategoryI[]>([])
  const [subcategories, setSubcategories] = useState<SubCategoryI[]>([])

  const fetchCategories = async () => {
    const response = await fetcher({ url: '/categories' })
    setCategories(response.data)
  }

  React.useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const category = categories.find(cat => cat.id === selectedCategory)
    if (category) {
      setSubcategories(category.subCategories)
    }
  }, [selectedCategory, categories])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label='Category'
              onChange={e => {
                field.onChange(e)
                setSubcategories([])
                setSelectedCategory(e.target.value) // Update the selected category
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

      {selectedCategory && (
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
                  const {
                    target: { value }
                  } = event
                  // On React 18, you need to convert the value to an array
                  field.onChange(typeof value === 'string' ? value.split(',') : value)
                }}
                value={field.value || []} // Ensure the value is always an array
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: string) => (
                      <Chip key={value} label={subcategories.find(sub => sub.id === value)?.name || value} />
                    ))}
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
      )}
    </>
  )
}

export default CategoriesInput
