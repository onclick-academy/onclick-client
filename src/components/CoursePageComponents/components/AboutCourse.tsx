import React, { useState, useEffect } from 'react'

export function AboutCourse() {

  const [courseData, setCourseData] = useState({})
  const [courseOwners, setCourseOwners] = useState([])



  const dummyCourseData = {
    id: '1',
    adminId: '1',
    categoryId: '1',
    subCategoryId: '1',
    createdAt: '1 jan 2021',
    title: 'Complete JavaScript Course',
    description:
      'This course is designed to teach you the basics of JavaScript This course is designed to teach you the basics of JavaScript This course is designed to teach you the basics of JavaScript This course is designed to teach you the basics of JavaScript.',
    price: 100,
    discount: 10,
    rate: 4.5,
    skillsGained: ['JavaScript', 'React', 'Node.js'],
    duration: '86h 30m',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    certificate: true,
    introVideo: 'https://www.youtube-nocookie.com/embed/DHjqpvDnNGE',
    isApproved: true,
    topicsId: ['1', '2', '3'],
    CourseOwners: [
      {
        id: '1',
        courseId: '1',
        userId: '1'
      }
    ]
  }

  const dummyCourseOwners = [
    {
      id: '1',
      courseId: '1',
      userId: '1'
    }
  ]

  const dummyUsers = [
    {
      id: '1',
      fullName: 'Kholoud Fattem',
      username: 'kholoudxs55kh',
      profilePic:
        'https://static.vecteezy.com/system/resources/previews/003/241/285/original/business-instructor-and-tutor-vector.jpg'
    }
  ]

  const dummyCategories = [
    {
      id: '1',
      title: 'Programming',
      description: 'This category covers programming languages.',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
    },
    {
      id: '2',
      title: 'Design',
      description: 'This category covers design.',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
    },
    {
      id: '3',
      title: 'Business',
      description: 'This category covers business.',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
    }
  ]

  const dummySubCategories = [
    {
      id: '1',
      categoryId: '1',
      courseId: '1',
      name: 'JavaScript',
      description: 'This subcategory covers JavaScript.'
    },
    {
      id: '2',
      categoryId: '1',
      courseId: '1',
      name: 'React',
      description: 'This subcategory covers React.'
    }
  ]

  const dummyTopics = {
    '1': {
      id: '1',
      title: 'JavaScript',
      description: 'This topic covers the basics of JavaScript.',
      lecturesId: ['1', '2', '3']
    },
    '2': {
      id: '2',
      title: 'Programming',
      description: 'This topic covers intermediate JavaScript.',
      lecturesId: ['4', '5', '6']
    },
    '3': {
      id: '3',
      title: 'Web Development',
      description: 'This topic covers advanced JavaScript.',
      lecturesId: ['7', '8', '9']
    }
  }

  const Sections = [
    {
      id: '1',
      courseId: '1',
      content: 'Begginer',
      fullduration: '2h 30m'
    },
    {
      id: '2',
      courseId: '1',
      content: 'Intermediate',
      fullduration: '2h 30m'
    },
    {
      id: '3',
      courseId: '1',
      content: 'Advanced',
      fullduration: '2h 30m'
    }
  ]

  const lectures = [
    {
      id: '1',
      sectionId: '1',
      order: 1,
      title: 'Introduction',
      description: 'This section covers the basics of JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '2',
      sectionId: '1',
      order: 2,
      title: 'Variables',
      description: 'This section covers variables in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '3',
      sectionId: '1',
      order: 3,
      title: 'Functions',
      description: 'This section covers functions in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '4',
      sectionId: '2',
      order: 1,
      title: 'Objects',
      description: 'This section covers objects in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '5',
      sectionId: '2',
      order: 2,
      title: 'Arrays',
      description: 'This section covers arrays in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '6',
      sectionId: '2',
      order: 3,
      title: 'Loops',
      description: 'This section covers loops in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '7',
      sectionId: '3',
      order: 1,
      title: 'Promises',
      description: 'This section covers promises in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '8',
      sectionId: '3',
      order: 2,
      title: 'Async/Await',
      description: 'This section covers async/await in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    },
    {
      id: '9',
      sectionId: '3',
      order: 3,
      title: 'Classes',
      description: 'This section covers classes in JavaScript.',
      videoUrl: 'https://youtu.be/DHjqpvDnNGE?si=_80Nv_q0WCcR0zVS',
      duration: '30m'
    }
  ]

  const handleEnrollment = () => {
    console.log('Enrolled')
  }

  const handleAddToWishList = () => {
    console.log('Added to wishlist')
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#164863',
        padding: '2rem'
      }}
    >
      <div style={{ width: '70%', display: 'flex' }}>
        <div>
          {dummyCourseData.introVideo &&
          <iframe
            width='560'
            height='315'
            src={dummyCourseData.introVideo}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>}
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
            <p>{dummyCourseData.description}</p>
            <span>Published At: {dummyCourseData.createdAt}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '0 auto', width: '95%' }}>
            <button
              style={{
                padding: '0.6rem',
                borderRadius: '35px',
                border: '0',
                backgroundColor: 'red',
                color: 'white',
                fontSize: '16px',
                width: '85%'
              }}
              onClick={handleEnrollment}
            >
              Enroll Now
            </button>
            <button
              style={{
                padding: '0.6rem',
                borderRadius: '35px',
                border: '0',
                backgroundColor: 'black',
                color: 'white',
                fontSize: '16px',
                width: '85%'
              }}
              onClick={handleAddToWishList}
            >
              Add To WishList
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
