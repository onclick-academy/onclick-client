'use client'
import React from 'react'
import { CourseLandingPage } from '@/components/CoursePageComponents/CourseLandingPage'
import PrimarySearchAppBar from '@/components/Nav/Nav'
import Navbar from '@/components/Nav/Nav'
import { useParams } from 'next/navigation'

const CoursePage = () => {
  const { id } = useParams()
  return (
    <>
      <Navbar />
      <CourseLandingPage id={id as string} />
    </>
  )
}

export default CoursePage
