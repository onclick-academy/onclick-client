import { fetcher } from '@/utilities/fetcher'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'

interface TopicI {
  title: string
  id: string
}

interface TopicsDataI {
  topic: TopicI
}

interface CourseI {
  id: string
  title: string
  photo: string
  topics: TopicsDataI[]
  categoryId: string
  publisher: InstructorI
  createdAt: string
  introVideo: string
  description: string
  price: number
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

export function AboutCourse(courseData: { courseData: CourseI }) {
  console.log('courseData', courseData)

  const [enrolled, setEnrolled] = useState(false)
  const [wishListed, setWishListed] = useState(false)

  const courseId = courseData.courseData.id

  function formatDate(dateString: any) {
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string')
      }
      return format(date, 'yyyy-MM-dd')
    } catch (error: any) {
      console.error('Error formatting date:', error.message)
      return 'Invalid date'
    }
  }

  const handleEnrollment = async () => {
    console.log('Enrolled')
    const url = '/courseEnrolls'
    const data = {
      courseId: courseData.courseData.id
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') window.alert('Enrolled successfully')
    if (res.status !== 'success') window.alert("You are already enrolled in this course or there's a problem")
  }

  useEffect(() => {
    const checkWishListed = async () => {
      try {
        const url = `/wishlist/isWishListed/${courseId}`
        const res = await fetcher({ url })
        console.log('res wishlisted', res)

        if (!res.data.isDeleted) {
          setWishListed(true)
        } else {
          setWishListed(false)
        }
      } catch (error) {
        console.error('Error checking wishlist:', error)
        setWishListed(false)
      }
    }

    const checkEnrollment = async () => {
      const url = `/courseEnrolls/${courseId}`
      const res = await fetcher({ url })
      if (res.data) {
        setEnrolled(true)
      } else {
        setEnrolled(false)
      }
    }

    const fetchData = async () => {
      await checkWishListed()
      await checkEnrollment()
    }
    fetchData()
  }, [courseId])

  const handleAddToWishList = async () => {
    console.log('Added to wishlist')
    const url = '/wishlist'
    const data = {
      courseId: courseData.courseData.id
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
            {courseData.courseData.introVideo && (
              <iframe
                width='560'
                height='315'
                src={courseData.courseData.introVideo}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0 2rem' }}>
              <p>
                <span style={{ fontWeight: 'Bolder', textDecoration: 'underline' }}>Course Description:</span>{' '}
                {courseData.courseData.description}
              </p>
              <span>
                <span style={{ fontWeight: 'Bolder', textDecoration: 'underline' }}>Published At:</span>{' '}
                {formatDate(courseData.courseData.createdAt)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', padding: '0 2rem', marginTop: '0' }}>
              <p>
                <span style={{ fontWeight: 'Bolder', textDecoration: 'underline' }}>Price:</span>{' '}
                {courseData.courseData.price}$
              </p>
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

// import { fetcher } from '@/utilities/fetcher'
// import React, { useState, useEffect } from 'react'
// import { format } from 'date-fns'

// interface TopicI {
//   title: string
//   id: string
// }

// interface TopicsDataI {
//   topic: TopicI
// }

// interface CourseI {
//   id: string
//   title: string
//   photo: string
//   topics: TopicsDataI[]
//   categoryId: string
//   publisher: InstructorI
//   createdAt: string
//   introVideo: string
//   description: string
//   category: CategoryI
// }
// interface UserI {
//   id: string
//   fullName: string
//   username: string
//   profilePic: string | null
// }

// interface InstructorI {
//   id: string
//   createdAt: string
//   updatedAt: string
//   userId: string
//   nationalID: string
//   cvLink: string
//   averageRate: number | null
//   isVerified: boolean
//   user: UserI
// }

// interface CategoryI {
//   title: string
// }

// export function AboutCourse(courseData: CourseI) {
//   const [enrolled, setEnrolled] = useState(false)
//   const [wishListed, setWishListed] = useState(false)

//   console.log("=========================", courseData)
//   function formatDate(dateString: any) {
//     try {
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) {
//         throw new Error('Invalid date string')
//       }
//       return format(date, 'yyyy-MM-dd')
//     } catch (error: any) {
//       console.error('Error formatting date:', error.message)
//       return 'Invalid date'
//     }
//   }

//   const handleEnrollment = async () => {
//     const url = '/courseEnrolls'
//     const data = {
//       courseId: courseData.id
//     }
//     const res = await fetcher({ url, method: 'POST', body: data })

//     if (res.status === 'success') window.alert('Enrolled successfully')
//     if (res.status === 500) window.alert('You are already enrolled in this course')
//   }

//   useEffect(() => {
//     const checkEnrollment = async () => {
//       const url = `/courseEnrolls/${courseData.id}`
//       const res = await fetcher({ url })
//       // console.log(res)
//       if (res.data) {
//         setEnrolled(true)
//       }
//     }

//     const checkWishListed = async () => {
//       const url = `/wishlist/isWishListed/${courseData.id}`
//       const res = await fetcher({ url})
//       console.log('checkWishListed ', res.data)
//       if (res.data) {
//         setWishListed(true)
//       }
//     }

//     checkWishListed()
//     checkEnrollment()
//   }, [])

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       width: '100%',
//       margin: '0 auto',
//       backgroundColor: '#1c558e',
//       padding: '2rem'
//     }}>
//       {' '}
//       {courseData && (
//         <div style={{ width: '70%', display: 'flex' }}>
//           <div>
//             {courseData.introVideo && (
//               <iframe
//                 width='560'
//                 height='315'
//                 src={courseData.introVideo}
//                 title='YouTube video player'
//                 frameBorder='0'
//                 allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
//                 referrerPolicy='strict-origin-when-cross-origin'
//                 allowFullScreen
//               ></iframe>
//             )}
//           </div>
//           <div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
//               <p>{courseData.description}</p>
//               <span>Published At: {formatDate(courseData.createdAt)}</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', margin: '0 auto', width: '95%' }}>
//               <button
//                 style={{
//                   padding: '0.6rem',
//                   borderRadius: '35px',
//                   border: '0',
//                   backgroundColor: enrolled ? '#adb5bd' : 'red',
//                   color: 'white',
//                   fontSize: '16px',
//                   width: '85%'
//                 }}
//                 onClick={handleEnrollment}
//               >
//                 {enrolled ? 'Enrolled' : 'Enroll Now'}
//               </button>
//               {wishListed ? (
//                 <RemoveFromWishList courseData={courseData as CourseI} />
//               ) : (
//                 <AddToWishListButton courseData={courseData as CourseI} />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// function AddToWishListButton({ courseData }) {
//   const handleAddToWishList = async () => {
//     console.log('Added to wishlist')
//     const url = '/wishlist'
//     const data = {
//       courseId: courseData.id
//     }
//     const res = await fetcher({ url, method: 'POST', body: data })

//     if (res.status === 'success') window.alert('Added To Wish List successfully')
//     if (res.status === 500) window.alert('You have already added this course to your wishlist')
//   }

//   return (
//     <button
//       style={{
//         padding: '0.6rem',
//         borderRadius: '35px',
//         border: '0',
//         backgroundColor: '#725ac1',
//         color: 'white',
//         fontSize: '16px',
//         width: '85%'
//       }}
//       onClick={handleAddToWishList}
//     >
//       Add To WishList
//     </button>
//   )
// }

// function RemoveFromWishList({ courseData }) {
//   const handleRemoveFromWishList = async () => {
//     console.log('Removed from wishlist')
//     const url = '/wishlist'
//     const data = {
//       courseId: courseData.id
//     }
//     const res = await fetcher({ url, method: 'DELETE', body: data })

//     if (res.status === 'success') window.alert('Removed from wishlist successfully')
//     if (res.status === 500) window.alert('You have already removed this course from your wishlist')
//   }

//   return (
//     <button
//       style={{
//         padding: '0.6rem',
//         borderRadius: '35px',
//         border: '0',
//         backgroundColor: 'Black',
//         color: 'white',
//         fontSize: '16px',
//         width: '85%'
//       }}
//       onClick={handleRemoveFromWishList}
//     >
//       Remove From WishList
//     </button>
//   )
// }
