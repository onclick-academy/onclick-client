import { Avatar } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import StarRate from '../../../../../components/CoursePageComponents/components/StartRating'
import { fetcher } from '@/utilities/fetcher'

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
}

export function WishListCard({ course }: { course: CourseII }) {
  const router = useRouter()

  console.log('course id', course.id)

  const handleEnroll = async () => {
    console.log('Enrolled')
    const url = '/courseEnrolls'
    const data = {
      courseId: course.course.id
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') window.alert('Enrolled successfully')
    if (res.status !== 'success') window.alert("You are already enrolled in this course or there's a problem")
  }

  const handleRemoveWishList = async () => {
    console.log('Removed')
    const url = `/wishlist/${course.id}`
    const res = await fetcher({ url, method: 'DELETE' })

    if (res.status === 'success') window.alert('Removed successfully')
    if (res.status !== 'success') window.alert('There was a problem removing the course')
  }

  const handleNavigate = () => {
    router.push(`/course/${course.course.id}`)
  }

  console.log('course from card ', course)
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        padding: '0.5rem',
        width: '75%',
        height: '30vh',
        border: '1px solid #333'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '55%', height: '100%' }}>
        <img src={course.course.photo} alt='course' style={{ height: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem, height:"10%"' }}>
          <div>
            <h2
              onClick={handleNavigate}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {course.course.title}
            </h2>
            <p>Category: {course.course.category.title}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Avatar
              alt='instructorPhoto'
              src={course.course.publisher.user.profilePic}
              sx={{ width: 50, height: 50 }}
            />
            <h4>{course.course.publisher.user.fullName}</h4>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '30%' }}>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div>
            <p>Price: {course.course.price}$</p>
            <p style={{ display: 'flex', gap: '0.5rem' }}>
              <span>Rating:</span> <StarRate rating={course.course.rating} />
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <button
              onClick={handleRemoveWishList}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '20px',
                border: '0px',
                borderRadius: '35px',
                backgroundColor: 'red'
              }}
            >
              Remove From Wishlist
            </button>
            <button
              onClick={handleEnroll}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '20px',
                border: '0',
                borderRadius: '35px',
                backgroundColor: 'blue'
              }}
            >
              Enroll
            </button>
            <button
              onClick={handleNavigate}
              style={{
                cursor: 'pointer',
                width: '100%',
                height: '20px',
                border: '0px',
                borderRadius: '35px',
                backgroundColor: 'lightgray'
              }}
            >
              View Course
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
