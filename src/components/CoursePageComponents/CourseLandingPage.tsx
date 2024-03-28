import React, { useEffect, useState } from 'react'
import { AboutCourse } from './components/AboutCourse'
import { IntroSection } from './components/IntroSection'
import { CourseSection } from './components/Section'
import { fetcher } from '@/utilities/fetcher'

interface TopicI {
  title: string
  id: string
}

interface TopicsDataI {
  topic: TopicI
}

interface CourseI {
  title: string
  photo: string
  topics: TopicsDataI[]
  categoryId: string
  publisher: InstructorI
  createdAt: string
  introVideo: string
  description: string
}
interface UserI {
  id: string
  fullName: string
  username: string
  profilePic: string | null
}

interface InstructorI {
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  nationalID: string
  cvLink: string
  averageRate: number | null
  isVerified: boolean
  user: UserI
}

interface CategoryI {
  title: string
}

interface LectureI {
  id: string
  sectionId: string
  order: number
  title: string
  description: string
  videoUrl: string
  duration: string
}

interface SectionI {
  id: string
  courseId: string
  content: string
  fullduration: string
  lectures: LectureI[]
}

export function CourseLandingPage() {
  const [courseData, setCourseData] = useState({} as CourseI)
  const [rating, setRating] = useState(0)
  const [categoryTitle, setCategoryTitle] = useState('' as CategoryI['title'])
  const [instructorData, setInstructorData] = useState({} as InstructorI)
  const [topicsData, setTopicsData] = useState([] as TopicsDataI[])
  const [sections, setSections] = useState([] as SectionI[])

  useEffect(() => {
    const getCourseData = async () => {
      const courseId = '0abe8853-8df2-4448-be4d-257bdb580960'
      const url = `/courses/${courseId}`
      const response = await fetcher({ url })
      return response
    }

    const getCategory = async (categoryId: string) => {
      const category = await fetcher({ url: `/categories/${categoryId}` })
      console.log('categoryyyyyyyyyyyyyyy  ', category)
      return category
    }

    const fetchData = async () => {
      const fetchedCourseData = await getCourseData()
      console.log(' fetchedCourseData ', fetchedCourseData)
      const fetchedCategory = await getCategory(fetchedCourseData.data.categoryId)
      setCourseData(fetchedCourseData.data)
      console.log(fetchedCategory)
      setCategoryTitle(fetchedCategory.data.title)
      setRating(fetchedCourseData.avrageRating)
      setInstructorData(fetchedCourseData.data.publisher)
      setTopicsData(fetchedCourseData.data.topics)
      setSections(fetchedCourseData.data.sections)
    }

    fetchData()
  }, [])

  return (
    <div>
      <IntroSection
        courseData={courseData}
        rating={rating}
        categoryTitle={categoryTitle}
        instructorData={instructorData}
        topicsData={topicsData}
      />
      <AboutCourse courseData={courseData} />
      <div style={{ display: 'flex', width: '70%', padding: '1rem', justifyContent: 'flex-start', margin: '0 auto' }}>
        <h1> Course Content </h1>
      </div>
      <CourseSection sections={sections} />
    </div>
  )
}
