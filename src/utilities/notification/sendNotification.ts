import { NotificationI } from '@/components/Notification'
import { fetcher } from '../fetcher'

const getUnreadNotifications = async () => {
  const userId = typeof window !== 'undefined' && localStorage.getItem('userId')
  try {
    const data = await fetcher({ url: `/notifications/unread/${userId}` })

    return data.data
  } catch (error) {
    console.error('Failed to fetch notifications', error)
  }
}

const getReadNotifications = async () => {
  const userId = typeof window !== 'undefined' && localStorage.getItem('userId')
  try {
    const data = await fetcher({ url: `/notifications/${userId}` })
    const notifications = data.data

    const readedNotifiacation = notifications.filter((notification: NotificationI) => notification.isRead === true)

    return readedNotifiacation
  } catch (error) {
    console.error('Failed to fetch notifications', error)
  }
}

export { getUnreadNotifications, getReadNotifications }
