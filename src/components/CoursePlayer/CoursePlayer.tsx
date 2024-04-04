'use client'
import React from 'react'
import SideList from '../CoursePlayer/Videolist'
import VideoPlayer from '../CoursePlayer/Videoplayer'
import Box from '@mui/material/Box'

export default function Courseplayer() {
  return (
    <Box
      sx={
        {
          //   display: 'flex',
          //   flexDirection: 'row',
          //   justifyContent: 'space-between',
          //   width: '100%',
          //   height: '100vh',
        }
      }
    >
      <SideList />
    </Box>
  )
}
