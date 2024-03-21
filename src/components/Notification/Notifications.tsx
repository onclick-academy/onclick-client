'use client'
import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from '@mui/icons-material/Notifications'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RateReviewIcon from '@mui/icons-material/RateReview'
import CampaignIcon from '@mui/icons-material/Campaign'
import CelebrationIcon from '@mui/icons-material/Celebration'
import GradeIcon from '@mui/icons-material/Grade'
import ForumIcon from '@mui/icons-material/Forum'

import { useRouter } from 'next/navigation'

import './notification.css'
import { getDeviceToken } from '@/utilities/device'
import { fetcher } from '@/utilities/fetcher'

const ITEM_HEIGHT = 100

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])

  const [unreadNotification, setUnreadNotification] = useState(0)

  const router = useRouter()
  const [permission, setPermission] = useState(Notification.permission)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const updatePermission = async () => {
      const perm = await Notification.requestPermission()
      setPermission(perm)
    }

    if (Notification.permission !== 'granted') {
      updatePermission()
    }

    const fetchData = async () => {
      const userId = localStorage.getItem('userId')

      const fetchedNotifications = await fetcher({
        url: `/notifications/`,
        method: 'GET',
        body: { recipientId: userId }
      })

      setNotifications(fetchedNotifications.data)

      const unread = fetchedNotifications.data.filter(notification => !notification.isRead)
      setUnreadNotification(unread.length)
    }

    fetchData()
  }, [])


  const handleNotificationIcon = (type: any) => {
    if (type === 'COURSE_ENROLLMENT') {
      return <CheckCircleIcon style={{ fontSize: '30px' }} />
    }
    if (type === 'COURSE_COMPLETION') {
      return <CelebrationIcon style={{ fontSize: '30px' }} />
    }
    if (type === 'NEW_COURSE_AVAILABLE') {
      return <GradeIcon style={{ fontSize: '30px' }} />
    }
    if (type === 'INSTRUCTOR_FEEDBACK') {
      return <ForumIcon style={{ fontSize: '30px' }} />
    }
    if (type === 'ADMIN_ANNOUNCEMENT') {
      return <CampaignIcon style={{ fontSize: '30px' }} />
    }
    if (type === 'REVIEW_COURESE') {
      return <RateReviewIcon style={{ fontSize: '30px' }} />
    }
  }

  const clearNotifications = () => {
    notifications.forEach(async notification => {
      if (!notification.isRead) {
        await fetcher({ url: `/notifications/${notification.id}`, method: 'PUT', body: { isRead: true } })
      }
    })
    setUnreadNotification(0)
  }

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
          <span className='notification-badge' style={{ display: unreadNotification < 1 ? 'none' : 'block' }}>
            {unreadNotification}
          </span>
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={() => clearNotifications()}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '40ch',
              overflowY: 'auto',
              scrollbarWidth: 'none'
            }
          }}
        >
          {notifications.map(notification => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <div
                onClick={() => router.push(notification.link)}
                style={{
                  display: 'flex',
                  gap: '0.3rem',
                  alignItems: 'center',
                  width: '100%',
                  borderBottom: '1px solid lightgray'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20%',
                    height: '70px'
                  }}
                >
                  {handleNotificationIcon(notification.type)}
                </div>
                <div style={{ width: '80%' }}>
                  <p style={{ width: '100%' }}>{notification.title}</p>
                  <p style={{ width: '100%', fontSize: '14px' }}>{notification.message}</p>
                </div>
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
