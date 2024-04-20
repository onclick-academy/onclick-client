import * as React from 'react'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Box from '@mui/material/Box'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Link from 'next/link'
import BasicRating from '../Rating/Rating'
import Chip from '@mui/material/Chip'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { fetcher } from '../../utilities/fetcher'
import style from './Courses.module.scss'
import ceo from '../../img/ceo.png'
export default function ImgMediaCard() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await fetcher({ url: '/courses' })
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
        padding: {
          xs: '0% 10% 0% 10%',
          sm: '0% 25% 0 25%',
          md: '0% 11% 0 11%',
          lg: '0% 0% 0 0%',
          xl: '0% 5% 0 5%'
        },
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '3%',
        maxWidth: '100%'
      }}
      className={style['courses-container']}
    >
      {courses?.map((course, index) => (
        <Card
          key={course.id}
          sx={{
            maxWidth: {
              xs: 250,
              sm: 300,
              md: 300,
              lg: 300,
              xl: 300
            },
            height: {
              xs: 450,
              sm: 500,
              md: 500,
              lg: 500,
              xl: 500
            },
            width: {
              xs: 250,
              sm: 300,
              md: 'calc(45% - 20px)',
              lg: 'calc(45% - 40px)',
              xl: 'calc(45% - 20px)'
            },
            backgroundColor: 'transparent',
            borderRadius: '1%',
            position: 'relative',
            marginTop: '3%',
            transition: '0.1s ease',
            '&:hover': {
              boxShadow: '0 0 5px 2px #b8b5cc',
              transition: '0.1s'
            },
            border: '1px solid #3a3939',
            borderTopWidth: '0.5px'
          }}
        >
          <Image
            width={300}
            height={200}
            // style={{ padding: '4% 6% 2% 6%', borderRadius: '10%', backgroundColor: 'transparent' }}
            className={style['imageStyle']}
            alt='green iguana'
            src={course.photo ? course.photo : 'https://via.placeholder.com/300'}
            loading='lazy'
          />
          <BookmarkBorderIcon
            sx={{
              color: '#fbfcff',
              fontSize: '25px',
              position: 'absolute',
              top: '5%',
              right: '8%',
              borderRadius: '5px',
              boxShadow: '0 0 10px 2px #aaa7c0',
              backgroundColor: '#1f1f1f71',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#553CDF',
                transition: '0.1s'
              }
            }}
          ></BookmarkBorderIcon>
          <Box sx={{ width: '100%', display: 'flex', padding: '0 0 0 7%', gap: '4%' }}>
            {course.skillsGained.slice(0, 2).map((skill, index) => (
              <Chip
                key={index}
                variant='outlined'
                label={skill.slice(0, 5)}
                // sx={{
                //   border: '1px solid transparet',
                //   fontSize: '14px'
                // }}
              >
                {skill.slice(0, 15)}
              </Chip>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: {
                xs: '4% 7% 0% 7%',
                sm: '6% 7% 2% 7%',
                md: '6% 7% 2% 7%',
                lg: '6% 7% 2% 7%',
                xl: '6% 7% 2% 7%'
              },
              width: '100%',
              justifyContent: 'start'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3%', width: '50%' }}>
              <NoteAltIcon sx={{ color: '#737477', fontSize: '18px' }}></NoteAltIcon>
              <Typography sx={{ color: '#7b7d81', marginTop: '3%' }}>25 Lessons </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '3%', width: '50%' }}>
              <AccessTimeIcon sx={{ color: '#7f8188', fontSize: '18px' }}></AccessTimeIcon>
              <Typography sx={{ color: '#83858b', marginTop: '3%' }}>{course.duration} </Typography>
            </Box>
          </Box>
          <CardContent
            sx={{
              height: {
                xl: '150px',
                lg: '150px',
                md: '150px',
                sm: '150px',
                xs: '120px'
              }
            }}
          >
            <Link
              style={{
                fontSize: '20px',
                textDecoration: 'none',
                textTransform: 'capitalize',
                color: '#cccfda',
                fontStyle: 'normal',
                fontWeight: 'bold',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                height: '65px'
              }}
              href={'/course/' + course.id}
            >
              {course.title}
            </Link>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                marginTop: '7%',
                display: 'flex',
                textTransform: 'uppercase',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {course?.publisher.user.firstName}
              {course?.publisher.user.lastName}
              {course?.publisher?.user?.profilePic ? (
                <Image
                  src={course?.publisher?.user?.profilePic}
                  alt='ceo'
                  width={30}
                  height={30}
                  style={{ border: '1px solid #553CDF', borderRadius: '50%' }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ color: '#737477', fontSize: '28px', border: '1px solid #553CDF', borderRadius: '15px' }}
                />
              )}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              padding: {
                xs: '5% 0% 0% 5%',
                sm: '0% 0% 0% 5%',
                md: '0% 0% 0% 5%',
                lg: '0% 0% 0% 5%',
                xl: '0% 0% 0% 5%'
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <BasicRating />
            <Typography sx={{ color: '#95979b', fontSize: '20px', padding: '0% 5% 0% 0%' }}>
              {'$' + course.price}
            </Typography>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
