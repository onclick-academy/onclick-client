'use client'
import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from '@mui/icons-material/Notifications'
import getData from '@/utilities/getUserData'

const ITEM_HEIGHT = 100

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])

  // TODO Browser
  const [permission, setPermission] = useState(Notification.permission)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    // #TODO Browser
    const updatePermission = async () => {
      const perm = await Notification.requestPermission()
      setPermission(perm)
    }

    if (Notification.permission !== 'granted') {
      updatePermission()
    }

    const getAllNotifications = async () => {
      try {
        const url = 'http://localhost:3000/api/v1/notifications'
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            credentials: 'include'
          }
        }
        const res = await fetch(url, options)
        if (!res.ok) {
          throw new Error('Failed to fetch notifications')
        }
        const notifications = await res.json()
        return notifications
      } catch (error) {
        console.error('Error fetching notifications:', error)
        return []
      }
    }

    const fetchData = async () => {
      const user = await getData()
      const userId = user.data.id

      const fetchedNotifications = await getAllNotifications()

      const userNotification = fetchedNotifications.filter(notification => notification.recipientId === userId)
      setNotifications(userNotification)
    }

    fetchData()
  }, [])
  console.log(notifications)

  return (
    notifications && (
      <div>
        <IconButton
          aria-label='more'
          id='long-button'
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <NotificationsIcon />
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '100ch'
            }
          }}
        >
          {notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <div>
                <p>{notification.icon}</p>
                <p>{notification.title}</p>
                <p>{notification.type}</p>
                <p>{notification.message}</p>
                <p>{notification.isRead}</p>
                <p>{notification.additionalInfo}</p>
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  )
}

// if permission is not granted, show a button to request permission
// if permission is granted, show the notifications
// if permission is denied, show a message to the user

// if permission is granted i need to get all the notifications , sort them by date and show them in the menu and the last 5 in the notification bell
// i need to also pop up a notification when a new notification is added to the list
// i need to mark a notification as read when it is clicked
// i need to mark all notifications as read when the menu is opened
// i need to show the number of unread notifications in the notification bell // TODO '/unread/:recipientId' => COUNT THEM
// i need to show the number of unread notifications in the tab title
// i need to show the number of unread notifications in the favicon
// i need to show the number of unread notifications in the browser notification
// i need to make sure that the notifications are not duplicated and that the last 5 are shown in the notification bell
// i need to make sure that i handle the differences between the browsers and the view of the notifications in the browser
// i need to make sure that the notifications are shown in the correct order
// onClick of the notification, i need to redirect the user to the correct page // TODO '/:notificationId' => REDIRECT TO THE CORRECT PAGE
