'use client'
// get AboutCourse component
import { AboutCourse } from '@/components/CoursePageComponents/components/AboutCourse'
import Nav from '@/components/Nav/Nav'
import { fetcher } from '@/utilities/fetcher'
import { useEffect, useState } from 'react'
import { WishListCard } from './components/WishListCard'

interface TopicI {
  title: string
  id: string
}

interface TopicsDataI {
  topic: TopicI
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
  isDeleted: boolean
  category: {
    title: string
  }
  price: number
  rating: number
}

interface CourseII {
  course: CourseI
  id: string
  isDeleted: boolean
}

export function WishList() {
  const [userWishList, setUserWishList] = useState([] as CourseII[])

  useEffect(() => {
    const getAllUserWishLists = async () => {
      const url = '/wishlist'
      const res = await fetcher({ url })
      console.log(res)
      return res
    }

    const fetchData = async () => {
      const fetched = await getAllUserWishLists()
      setUserWishList(fetched.data)
    }
    fetchData()
  }, [])

  console.log('wishlists', userWishList)

  return (
    <div>
      <Nav />
      <div
        style={{
          width: '100%',
          height: '15vh',
          backgroundColor: '#999',
          color: '#fff',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <h1 style={{ marginLeft: '15%' }}>My Learning Wish List</h1>
      </div>
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem',
          margin: '0 auto'
        }}
      >
        {userWishList &&
          userWishList
            .filter(userWishList => !userWishList.isDeleted)
            .map(course => <WishListCard key={course.id} course={course} />)}

        {userWishList.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: '#333', textAlign: 'center' }}>No courses in your wish list yet</h1>
          </div>
        )}
      </div>
    </div>
  )
}
