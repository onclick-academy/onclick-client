import React, { useState, useEffect } from 'react'

export const useRealTimeNotifications = userId => {
  const [notifications, setNotifications] = useState([])

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
