import * as React from 'react'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Box from '@mui/material/Box'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Link from 'next/link'
import BasicRating from '../Rating/Rating'
import { fetcher } from '../../utilities/fetcher'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import PersonIcon from '@mui/icons-material/Person'
import { Button } from '@mui/material'
import style from './News.module.scss'

export default function ImgMediaCard() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await fetcher({ url: '/news' })
        setCourses(courseData.data)
      } catch (error) {
        console.error('An error occurred while fetching the data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <Box
      sx={{
        // backgroundImage: ' linear-gradient(-20deg, #232425 0%, #4e4376 100%)',
        padding: {
          xs: '5% 20% 10% 10%',
          sm: '5% 20% 8% 25%',
          md: '5% 20% 8% 25%',
          lg: '3% 20% 8% 25%',
          xl: '0% 20% 8% 25%'
        },
        marginTop: '5%',
        display: 'flex',
        boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.05)',
        flexWrap: 'wrap',
        gap: '4%',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography
          variant='h4'
          sx={{ color: '#4934c0', margin: '2% 0% 1% 0%', textAlign: 'center', fontSize: '20px' }}
        >
          <TipsAndUpdatesIcon sx={{ color: '#4934c0' }} /> News & Articles
        </Typography>
        <Typography variant='h6' sx={{ color: '#fff', textAlign: 'center', fontSize: '30px', fontWeight: 'bolder' }}>
          Read Our Latest News
        </Typography>
        <Typography variant='body1' sx={{ color: '#b4acac', textAlign: 'center' }}>
          Our mission is to provide you with valuable insights
        </Typography>
      </Box>
      {courses?.map((course, index) => (
        <Card
          key={course.id}
          sx={{
            maxWidth: 1000,
            height: {
              lg: '230px',
              md: '350px',
              sm: '400px',
              xs: '400px'
            },
            display: 'flex',
            flexDirection: {
              lg: 'row',
              md: 'column',
              sm: 'column',
              xs: 'column'
            },
            alignItems: 'center',
            backgroundColor: '#121212',
            borderRadius: '1%',
            marginTop: '3%',
            transition: '0.2s ease',
            '&:hover': {
              transition: '0.5s',
              borderLeft: '9px solid #352688',
              transform: 'translateX(1%)'
            },
            border: '1px solid #3a3939',
            borderTopWidth: '0.5px'
          }}
        >
          <Image
            width={350}
            height={200}
            style={{ marginLeft: '2%', borderRadius: '2%' }}
            className={style['imageStyle']}
            alt='green iguana'
            src={course.cover}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3%',
                textAlign: 'center',
                flexDirection: {
                  lg: 'column',
                  xl: 'row'
                },
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3%',
                  width: {
                    xl: '40%',
                    lg: '100%'
                  },
                  justifyContent: 'center'
                }}
              >
                <CalendarMonthIcon sx={{ color: '#737477', fontSize: '18px' }}></CalendarMonthIcon>
                <Typography sx={{ color: '#7b7d81', marginTop: '3%', textAlign: 'center' }}>
                  {new Date(course.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>
            <CardContent
              sx={{
                height: '0px',
                width: '100%',
                textAlign: 'center',
                padding: {
                  xl: '0 4% 0 0%',
                  lg: '0 4% 0 0%',
                  md: '0 4% 0 0%',
                  sm: '0 4% 0 0%',
                  xs: '0 4% 0 0%'
                }
              }}
            >
              <Link
                style={{
                  fontSize: '24px',
                  textDecoration: 'none',
                  color: '#cccfda',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
                className={style['wordStyle']}
                href={'/'}
              >
                {course.title}
              </Link>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{
                  marginTop: '0%',
                  display: 'flex',
                  overflow: 'hidden',
                  lineHeight: '1.5',
                  whiteSpace: 'stable',
                  width: '100%',
                  justifyContent: 'center',
                  marginLeft:"1%",
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  color: '#a2aab9'
                }}
              >
                {course.subtitle.slice(0, 100) + '...'}
              </Typography>
            </CardContent>
          </Box>
          <CardActions
            sx={{
              width: '40%',
              marginTop: {
                lg: '0%',
                md: '0%',
                sm: '12%',
                xs: '19%'
              }
            }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#4f35e2',
                color: 'white',
                height: '50px',
                width: '100%',
                '&:hover': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: '1px solid #4f35e2'
                }
              }}
            >
              Read More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
