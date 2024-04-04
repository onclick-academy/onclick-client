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

interface Lesson {
  id: number
  title: string
  Link: string
}

const Course = {
  info: {
    title: 'Web Development',
    description: 'Learn how to build web applications',
    duration: '3 hrs',
    level: 'Beginner'
  },

  lectures: [
    {
      id: 1,
      title: 'Introduction to React',
      lessons: [
        {
          id: 5,
          title: 'What is React',
          Link: 'https://cdn.pixabay.com/video/2024/02/04/199294-909903183_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png'
        },
        {
          id: 4,
          title: 'Why use React',
          Link: 'https://cdn.pixabay.com/video/2024/02/02/199001-909564581_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png'
        },
        {
          id: 3,
          title: 'How to use React',
          Link: 'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png'
        }
      ]
    },

    {
      id: 2,
      title: 'Introduction to Angular',
      lessons: [
        {
          id: 1,
          title: 'What is Angular',
          Link: 'https://cdn.pixabay.com/video/2024/02/04/199294-909903183_large.mp4',
          thumb: 'https://www.searchenginejournal.com/wp-content/uploads/2019/04/the-seo-guide-to-angular.png'
        },
        {
          id: 2,
          title: 'Why use Angular',
          Link: 'https://cdn.pixabay.com/video/2024/02/02/199001-909564581_large.mp4',
          thumb: 'https://www.searchenginejournal.com/wp-content/uploads/2019/04/the-seo-guide-to-angular.png'
        },
        {
          id: 6,
          title: 'How to use Angular',
          Link: 'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4',
          thumb: 'https://www.searchenginejournal.com/wp-content/uploads/2019/04/the-seo-guide-to-angular.png'
        }
      ]
    },
    {
      id: 3,
      title: 'Introduction to Vue',
      lessons: [
        {
          id: 8,
          title: 'What is Vue?',
          Link: 'https://cdn.pixabay.com/video/2024/02/04/199294-909903183_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:900/1*OrjCKmou1jT4It5so5gvOA.jpeg'
        },
        {
          id: 9,
          title: 'Why use Vue',
          Link: 'https://cdn.pixabay.com/video/2024/02/02/199001-909564581_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:900/1*OrjCKmou1jT4It5so5gvOA.jpeg'
        },
        {
          id: 7,
          title: 'How to use Vue',
          Link: 'https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4',
          thumb: 'https://miro.medium.com/v2/resize:fit:900/1*OrjCKmou1jT4It5so5gvOA.jpeg'
        }
      ]
    }
  ]
}

export default function PinnedSubheaderList() {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(() => {
    // Initialize currentLesson with the first lesson of the first section
    const firstLesson = Course[0]?.lessons[0] ?? null
    return firstLesson
  })

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
          {Course.info.title}
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
          {Course.lectures.map(section => (
            <li key={`section-${section.id}`}>
              <ul>
                <ListSubheader sx={{ backgroundColor: '#313131' }}>{section.title}</ListSubheader>

                {section.lessons.map(item => (
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
                    <Image src={item.thumb} width={80} height={50} alt='img' className={style.img} />

                    <Box>
                      <Typography sx={{ fontSize: '14px' }}>{`${item.title}`}</Typography>
                      <Typography sx={{ fontSize: '13px', color: '#8a8a8a' }}>{`00:00:00`}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
        {currentLesson && <VideoPlayer videoLink={currentLesson.Link} />}
      </Box>
    </Box>
  )
}
