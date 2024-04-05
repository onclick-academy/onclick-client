import { fetcher } from '@/utilities/fetcher'

export const launch = async (data: any, courseId: string) => {
  for (const section of data.sections) {
    console.log('🚀 ~ launch ~ section:', section)
    const fullDuration = section.lectures
      .map((lecture: any) => lecture.duration || 0)
      .reduce((a: number, b: number) => a + b, 0)

    const sectionRes = await fetcher({
      url: '/sections',
      method: 'POST',
      body: {
        courseId: courseId,
        title: section.title,
        fullDuration: fullDuration.toString()
      }
    })

    for (const lecture of section.lectures) {
      await fetcher({
        url: '/lectures',
        method: 'POST',
        body: {
          title: lecture.title,
          description: lecture.description,
          sectionId: sectionRes.data.id,
          duration: `${lecture.duration}`,
          videoUrl: lecture.video,
          thumbnail: lecture.thumbnail || 'default-thumbnail-url'
        }
      })
    }
  }
}
