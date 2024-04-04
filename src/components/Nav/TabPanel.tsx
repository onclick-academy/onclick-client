'use client'
import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { login } from '../../utilities/authLogin'
import { fetchSubCategories } from '../../utilities/authLogin'
import Categories from './CategoyIds'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
    name: `lool`
  }
}

export default function VerticalTabs() {
  const [Subcategories, setSubcategories] = useState({ data: [] })
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    async function exampleUsage() {
      try {
        const email = 'omar88@gmail.com'
        const password = 'password'

        const userData = await login(email, password)
        console.log('Logged in successfully:', userData)

        const SubcategoriesData = await fetchSubCategories()
        setSubcategories(SubcategoriesData)
        console.log('Categories:', SubcategoriesData)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    exampleUsage()
  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'linear-gradient(60deg, #29323c 0%, #485563 100%)',
        display: 'flex',
        height: 224,
        position: 'absolute',
        top: '100%',
        zIndex: 1000
      }}
    >
      <Tabs
        orientation='vertical'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='Vertical tabs example'
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {Categories.map((category, index) => (
          <Tab key={index} label={category.name} {...a11yProps(index)} />
        ))}
      </Tabs>
      {Categories.map((category, index) => (
        <TabPanel key={index} value={value} index={index}>
          {/* Filter subcategories based on the category ID */}
          {Subcategories.data
            .filter(subCategory => category.id === subCategory.categoryId)
            .map((subCategory, subIndex) => (
              <Link
                sx={{ color: 'white', textDecoration: 'none', display: 'flex' }}
                href={`/courses/${subCategory.name}/${subCategory.id}`}
                key={subIndex}
              >
                {subCategory.name}
              </Link>
            ))}
        </TabPanel>
      ))}
    </Box>
  )
}
