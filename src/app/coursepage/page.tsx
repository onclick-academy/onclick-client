'use client'
import React from 'react'
import { CourseLandingPage } from '@/components/CoursePageComponents/CourseLandingPage'
import PrimarySearchAppBar from '@/components/Nav/Nav'
import Navbar from '@/components/Nav/Nav'

const CoursePage = () => {
  return (<>
    <Navbar />
    <CourseLandingPage />
  </>)
}

export default CoursePage;
