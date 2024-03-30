import { fetcher } from '@/utilities/fetcher'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

export function AboutCourse({ courseData }) {
  const [enrolled, setEnrolled] = useState(false)
  const [wishListed, setWishListed] = useState(false)

  function formatDate(dateString) {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string')
      }
      return format(date, 'yyyy-MM-dd')
    } catch (error) {
      console.error('Error formatting date:', error.message)
      return 'Invalid date'
    }
  }

  const handleEnrollment = async () => {
    console.log('Enrolled')
    const url = '/courseEnrolls'
    const data = {
      courseId: courseData.id
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') window.alert('Enrolled successfully')
    if (res.status === 500) window.alert('You are already enrolled in this course')
  }

  useEffect(() => {
    const checkEnrollment = async () => {
      const url = `/courseEnrolls/${courseData.id}`
      const res = await fetcher({ url })
      console.log(res)
      if (res.data) {
        setEnrolled(true)
      }
    }

    const checkWishListed = async () => {
      const url = '/wishlist'
      const res = await fetcher({ url })
      console.log(res)
      if (res.data) {
        setWishListed(true)
      }
    }

    checkWishListed()
    checkEnrollment()
  }, [])

  const handleAddToWishList = async () => {
    console.log('Added to wishlist')
    const url = '/wishlist'
    const data = {
      courseId: courseData.id
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') window.alert('Added To Wish List successfully')
    if (res.status === 500) window.alert('You have already added this course to your wishlist')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#1c558e',
        padding: '2rem'
      }}
    >
      {' '}
      {courseData && (
        <div style={{ width: '70%', display: 'flex' }}>
          <div>
            {courseData.introVideo && (
              <iframe
                width='560'
                height='315'
                src={courseData.introVideo}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
              <p>{courseData.description}</p>
              <span>Published At: {formatDate(courseData.createdAt)}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '0 auto', width: '95%' }}>
              <button
                style={{
                  padding: '0.6rem',
                  borderRadius: '35px',
                  border: '0',
                  backgroundColor: enrolled ? '#adb5bd' : 'red',
                  color: 'white',
                  fontSize: '16px',
                  width: '85%'
                }}
                onClick={handleEnrollment}
              >
                {enrolled ? 'Enrolled' : 'Enroll Now'}
              </button>
              <button
                style={{
                  padding: '0.6rem',
                  borderRadius: '35px',
                  border: '0',
                  backgroundColor: wishListed ? '#725ac1' : 'black',
                  color: 'white',
                  fontSize: '16px',
                  width: '85%'
                }}
                onClick={handleAddToWishList}
              >
                {wishListed ? 'Added To Wish List' : 'Add To WishList'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
