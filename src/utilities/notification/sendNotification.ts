import { NotificationI } from '@/components/Notification'

const getUnreadNotifications = async () => {
  const userId = localStorage.getItem('userId')
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/unread/${userId}`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()

    return data.data
  } catch (error) {
    console.error('Failed to fetch notifications', error)
  }
}

const getReadNotifications = async () => {
  const userId = localStorage.getItem('userId')
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    const notifications = data.data

    const readedNotifiacation = notifications.filter((notification: NotificationI) => notification.isRead === true)

    return readedNotifiacation
  } catch (error) {
    console.error('Failed to fetch notifications', error)
  }
}

export { getUnreadNotifications, getReadNotifications }
