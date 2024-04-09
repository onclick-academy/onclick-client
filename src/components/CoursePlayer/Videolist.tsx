'use client'
import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Box from '@mui/material/Box'
import VideoPlayer from './Videoplayer'
import { useState } from 'react'
import { Typography } from '@mui/material'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import Image from 'next/image'
import style from './Player.module.css'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import {fetcher} from '@/utilities/fetcher'

interface Lesson {
  id: number
  title: string
  Link: string
}

export default function PinnedSubheaderList() {
  const { lectureId } = useParams()
  const [Course, setCourse] = useState({ data: [] })
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(() => {
    // Initialize currentLesson with the first lesson of the first section
    const firstLesson = Course[0]?.sections[0] ?? null
    return firstLesson
  })

  useEffect(() => {
    const getCourseData = async () => {
      const courseId = lectureId
      const url = `/courses/${courseId}`
      const response = await fetcher({ url })
      return response
    }

    const fetchData = async () => {
      const fetchedCourseData = await getCourseData()
      console.log(' fetchedCourseData ', fetchedCourseData)
      setCourse(fetchedCourseData.data)
    }

    fetchData()
  }, [lectureId])
  console.log('Course', Course)
  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#222',
          alignItems: 'start',
          height: '50px'
        }}
      >
        <Typography
          variant='h4'
          sx={{
            color: '#9bd2d9',
            display: 'flex',
            fontSize: '15px',
            maxWidth: 400,
            backgroundColor: '#23515b',
            padding: '10px 5px 10px 20px',
            alignItems: 'center'
          }}
        >
          <VideoLibraryIcon sx={{ color: '#9dced9;', fontSize: '30px', marginRight: '1%' }}></VideoLibraryIcon>
          {Course?.title}
        </Typography>
        <Typography
          variant='h4'
          sx={{
            color: '#59acbe',
            display: 'flex',
            fontSize: '15px',
            padding: '16px 5px 10px 20px',
            alignItems: 'center'
          }}
        >
          {currentLesson && currentLesson.title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column-reverse',
            md: 'row',
            lg: 'row',
            xl: 'row'
          },
          justifyContent: 'space-between',
          width: '100%',
          height: {
            xs: 'calc(50% - 50px)',
            sm: 'calc(50% - 50px)',
            md: 'calc(100vh - 50px)',
            lg: 'calc(100vh - 50px)',
            xl: 'calc(100vh - 50px)'
          },
          alignItems: 'start'
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: '100%',
              md: 320,
              lg: 320,
              xl: 320
            },
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
            backgroundColor: '#222',
            height: {
              xs: 'calc(50% - 50px)',
              sm: 'calc(50% - 50px)',
              md: 'calc(100vh - 50px)',
              lg: 'calc(100vh - 50px)',
              xl: 'calc(100vh - 50px)'
            }
          }}
          subheader={<li />}
        >
          <ListSubheader>{'Lessons'}</ListSubheader>
          {Course?.sections?.map(section => (
            <li key={`section-${section.id}`}>
              <ul>
                <ListSubheader sx={{ backgroundColor: '#313131' }}>{section.title}</ListSubheader>

                {section?.lectures?.map(item => (
                  <ListItem
                    key={`item-${item.id}`}
                    button
                    onClick={() => handleLessonClick(item)}
                    sx={{
                      backgroundColor: currentLesson?.id === item.id ? '#23515b' : 'transparent',
                      display: 'flex',
                      alignItems: 'start',
                      gap: '2%'
                    }}
                    className={style.img}
                  >
                    <Image src={item.thumbnail} width={80} height={50} alt='img' className={style.img} />

                    <Box>
                      <Typography sx={{ fontSize: '14px' }}>{`${item.title}`}</Typography>
                      <Typography sx={{ fontSize: '13px', color: '#8a8a8a' }}>{`00:${item.duration}:00`}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
        {currentLesson && <VideoPlayer videoLink={currentLesson?.videoUrl} />}
      </Box>
    </Box>
  )
}
