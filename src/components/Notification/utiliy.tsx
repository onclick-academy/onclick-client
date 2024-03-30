import { NotificationI } from '@/components/Notification'
import React, { useState, useEffect, Dispatch } from 'react'
import { getReadNotifications, getUnreadNotifications } from '@/utilities/notification/sendNotification'

export const useRealTimeNotifications = (userId: string | null) => {
  const [notifications, setNotifications] = useState<NotificationI[]>([])

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found')
      return
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/realtime/${userId}`
    const eventSource = new EventSource(url, {
      withCredentials: true
    })

    // Handle a new message
    eventSource.onmessage = event => {
      try {
        const newNotification = JSON.parse(event.data)
        console.log('New notification:', newNotification)
        setNotifications(prevNotifications => [...prevNotifications, newNotification])
      } catch (error) {
        console.error('Error parsing notification JSON:', error)
      }
    }

    // Handle any errors
    eventSource.onerror = error => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    // Clean up the connection when the component or hook unmounts
    return () => {
      eventSource.close()
    }
  }, [userId]) // Re-establish the connection if the userId changes

  return notifications
}

export const useNotifications = (userId: string | null, setAllNotifications: any) => {
  const rNotifications = useRealTimeNotifications(userId)

  const handleRead = async (id: string) => {
    console.log('Marking notification as read:', id)
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`
      await fetch(url, {
        method: 'PUT',
        credentials: 'include'
      })
      setAllNotifications((prev: any) =>
        prev.filter((notification: NotificationI) => {
          if (notification.id === id) {
            notification.isRead = true
          }
          return notification
        })
      )
    } catch (error) {
      console.error('Failed to mark notification as read', error)
    }
  }
  const handleDelete = async (id: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`
      await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      })
      setAllNotifications((prev: NotificationI[]) =>
        prev.filter((notification: NotificationI) => notification.id !== id)
      )
    } catch (error) {
      console.error('Failed to delete notification', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readedNotification = await getReadNotifications()
        const unreadNotifications = await getUnreadNotifications()
        setAllNotifications([...unreadNotifications, ...readedNotification])
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    }

    fetchData()
  }, [setAllNotifications])

  useEffect(() => {
    setAllNotifications((current: NotificationI[]) => {
      // Find the most recent 'createdAt' date among current notifications
      const latestDate = new Date(Math.max(...current.map(noti => new Date(noti.createdAt).getTime())))
      // Filter out real-time notifications that are older than the most recent
      const newNotifications = rNotifications.filter(noti => new Date(noti.createdAt) > latestDate)
      return [...current, ...newNotifications]
    })
  }, [rNotifications, setAllNotifications])

  return {
    handleRead,
    handleDelete
  }
}
