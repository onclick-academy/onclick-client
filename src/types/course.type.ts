export interface CourseI {
  createdBy: string
  adminId?: string
  categoryId: string
  subCategoryId: string
  title: string
  description: string
  price: number
  rate?: number
  discount?: number
  isAvailable: boolean
  duration: string
  photo: string
  isDeleted: boolean
  deletedAt?: Date
  certificate: string
  introVideo?: string
  isApproved: boolean

  // Define properties that not in schema but only for frontend developement
  skillsGained: string
  categories: CategoryI[]

  // Define properties for related entities
  topics: CourseTopic[]
  lectures: Lecture[]
  enrollments: CourseEnrollment[]
  wishList: WishList[]
  approvedBy?: User
  subCategories: SubCategory[]
  publisher: Instructor
  ratings: Rating[]
  courseOwners: CourseOwners[]
}

interface CategoryI {}

// Placeholder interfaces for related entities
interface CourseTopic {
  // Define properties for CourseTopic
  title: string
}

interface Lecture {
  // Define properties for Lecture
}

interface CourseEnrollment {
  // Define properties for CourseEnrollment
}

interface WishList {
  // Define properties for WishList
}

interface User {
  // Define properties for User
}

interface SubCategory {
  // Define properties for SubCategory
  name: string
  description: string
}

interface Instructor {
  // Define properties for Instructor
}

interface Rating {
  // Define properties for Rating
}

interface CourseOwners {
  // Define properties for CourseOwners
}
