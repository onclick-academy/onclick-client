import { fetcher } from '@/utilities/fetcher'
import StarRate from './StartRating'
import React, { useState, useEffect } from 'react'

interface Topic {
  title: string;
}

interface TopicsData {
  topic: Topic;
}

export function IntroSection() {
  const [courseData, setCourseData] = useState({})
  const [rating, setRating] = useState(0)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [instructorData, setInstructorData] = useState([])
  const [topicsData, setTopicsData] = useState([] as TopicsData[])

  useEffect(() => {
    const getCourseData = async () => {
      const courseId = '0abe8853-8df2-4448-be4d-257bdb580960'
      const url = `/courses/${courseId}`
      const response = await fetcher({ url })
      return response
    }

    const getCategory = async (categoryId: string) => {
      const category = await fetcher({ url: `/categories/${categoryId}` })
      console.log("categoryyyyyyyyyyyyyyy  ",category)
      return category
    }

    const fetchData = async () => {
      const fetchedCourseData = await getCourseData()
      console.log(" fetchedCourseData ",fetchedCourseData)
      const fetchedCategory = await getCategory(fetchedCourseData.data.categoryId)
      setCourseData(fetchedCourseData.data)
      console.log(fetchedCategory)
      setCategoryTitle(fetchedCategory.data.title)
      setRating(fetchedCourseData.avrageRating)
      setInstructorData(fetchedCourseData.data.publisher)
      setTopicsData(fetchedCourseData.data.topics)
    }

    fetchData()
  }, [])

  console.log("courseData",courseData)
  console.log("rating",rating)
  console.log("categoryTitle",categoryTitle)
  console.log("instructorData",instructorData)
  console.log("topicsData",topicsData)

  const handleTopicsTitle = () => {
    return topicsData.map(topic => topic.topic.title).join(', ')
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto', backgroundColor: '#1B3C73' }}
    >
      {courseData && (
        <div style={{ width: '70%' }}>
          <div className='course-intro' style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
            <div
              style={{
                border: '1px solid white',
                width: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* <img style={{ width: '90%', height: '90%' }} src={courseData.photo} alt='coursePhoto' /> */}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* <h1>{courseData.title}</h1> */}
              <StarRate rating={rating} />
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <p>Category: {categoryTitle}</p>
                <p style={{ marginLeft: '3rem' }}>Topics: {handleTopicsTitle()}</p>
              </div>

              {/* <div key={instructorData.id} style={{ display: 'flex', gap: '1rem' }}> */}
                <img
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  // src={instructorData.profilePic}
                  alt='instructorPhoto'
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* <p>{instructorData.user.fullName}</p>
                  <p>{instructorData.user.username}</p> */}
                </div>
              </div>
            </div>
          </div>
        // </div>
      )}
    </div>
  )
}
