'use client'
import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from '@mui/icons-material/Notifications'
import getData from '@/utilities/getUserData'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RateReviewIcon from '@mui/icons-material/RateReview'
import CampaignIcon from '@mui/icons-material/Campaign'
import CelebrationIcon from '@mui/icons-material/Celebration'
import GradeIcon from '@mui/icons-material/Grade'
import ForumIcon from '@mui/icons-material/Forum'

import { useRouter } from 'next/navigation'
import { Typography } from '@mui/material'

import './notification.css'

const ITEM_HEIGHT = 100

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])

  const router = useRouter()
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

  const dummyNotifications = [
    {
      id: 1,
      title: 'Notification 1',
      type: 'COURSE_ENROLLMENT',
      message: 'This is notification 1 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 1.',
      link: '/notification1'
    },
    {
      id: 2,
      title: 'Notification 2',
      type: 'COURSE_COMPLETION',
      message:
      'This is notification 2 message. verrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrryyyyyyyyyyyyyyyyyyy loooooooooooooooooooooongggggg',
      isRead: true,
      additionalInfo: 'Additional information for notification 2.',
      link: '/notification2'
    },
    {
      id: 3,
      title: 'Notification 3',
      type: 'NEW_COURSE_AVAILABLE',
      message: 'This is notification 3 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 3.',
      link: '/notification3'
    },
    {
      id: 4,
      title: 'Notification 4',
      type: 'INSTRUCTOR_FEEDBACK',
      message: 'This is notification 4 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 4.',
      link: '/notification4'
    },
    {
      id: 5,
      title: 'Notification 5',
      type: 'ADMIN_ANNOUNCEMENT',
      message: 'This is notification 5 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 5.',
      link: '/notification5'
    },
    {
      id: 6,
      title: 'Notification 6',
      type: 'REVIEW_COURESE',
      message: 'This is notification 6 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 6.',
      link: '/notification6'
    },
    {
      id: 7,
      title: 'Notification 7',
      type: 'COURSE_ENROLLMENT',
      message: 'This is notification 7 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 7.',
      link: '/notification7'
    },
    {
      id: 8,
      title: 'Notification 8',
      type: 'COURSE_COMPLETION',
      message: 'This is notification 8 message.',
      isRead: true,
      additionalInfo: 'Additional information for notification 8.',
      link: '/notification8'
    },
    {
      id: 9,
      title: 'Notification 9',
      type: 'NEW_COURSE_AVAILABLE',
      message: 'This is notification 9 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 9.',
      link: '/notification9'
    },
    {
      id: 10,
      title: 'Notification 10',
      type: 'INSTRUCTOR_FEEDBACK',
      message: 'This is notification 10 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 10.',
      link: '/notification10'
    },
    {
      id: 11,
      title: 'Notification 11',
      type: 'ADMIN_ANNOUNCEMENT',
      message: 'This is notification 11 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 11.',
      link: '/notification11'
    },
    {
      id: 12,
      title: 'Notification 12',
      type: 'REVIEW_COURESE',
      message: 'This is notification 12 message.',
      isRead: false,
      additionalInfo: 'Additional information for notification 12.',
      link: '/notification12'
    }
  ]

  const [unreadNotification, setUnreadNotification] = useState(dummyNotifications.filter(notification => !notification.isRead).length)

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
          <span className='notification-badge' style={{display:unreadNotification === 0? "none": "block"}}>{unreadNotification}</span>
        </IconButton>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={() => setUnreadNotification(0)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '40ch',
              overflowY: 'auto',
              scrollbarWidth: 'none',
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }
          }}
        >
          {dummyNotifications.map(notification => (
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
                  <p style={{ width: '100%'}}>{notification.title}</p>
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
