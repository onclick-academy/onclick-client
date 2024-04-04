import StarRate from './StartRating'
import React from 'react'
import { Avatar } from '@mui/material'

export function IntroSection({ courseData, rating, categoryTitle, instructorData, topicsData }) {
  console.log('intro section ', courseData)

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto', backgroundColor: '#013a63' }}
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
              <img style={{ width: '90%', height: '90%' }} src={courseData.photo} alt='coursePhoto' />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1>{courseData.title}</h1>
              <StarRate rating={rating} />
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                <p>Category: {categoryTitle}</p>
                <p style={{ marginLeft: '3rem' }}>
                  <ul style={{ display: 'flex', gap: '1rem' }}>
                    Topics:{' '}
                    {topicsData.map(topic => (
                      <li key={topic.topic.id} style={{ marginLeft: '1rem' }}>
                        {topic.topic.title}
                      </li>
                    ))}
                  </ul>{' '}
                </p>
              </div>
              {instructorData.user && (
                <div key={instructorData.id} style={{ display: 'flex', gap: '1rem' }}>
                  <Avatar alt='instructorPhoto' src={instructorData.user.profilePic} sx={{ width: 50, height: 50 }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <p>{instructorData.user.fullName}</p>
                    <p>{instructorData.user.username}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
