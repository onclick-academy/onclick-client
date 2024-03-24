import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import NotificationsIcon from '@mui/icons-material/Notifications'
import './notification.scss' // Assuming styles are defined here
import { useRealTimeNotifications } from '@/hooks/RealTimeNotifications'
import { getNotificationIcon } from './NotificationIcons'
import Link from 'next/link'

const ITEM_HEIGHT = 100

const NotificationItem = ({ notification, onClose, handleRead, handleDelete }) => {
  return (
    <MenuItem
      sx={{
        border: notification.isRead ? '1.5px solid #3d3d3d' : '1.5px solid #3970e6'
      }}
      id='notification-container-item'
      key={notification.id}
      onClick={onClose}
    >
      <div className='notification-item'>
        <Link target='_blank' passHref={true} href={notification.link}>
          <div>{getNotificationIcon(notification.type)}</div>
          <div className='notification-text'>
            <p
              style={{
                fontSize: 14
              }}
            >
              {notification.title}
            </p>
            <p
              style={{
                fontSize: 11.5,
                color: '#616161',
                whiteSpace: 'wrap',
                lineHeight: '0.9rem'
              }}
              className='notification-message'
            >
              {notification.message.length > 50 ? notification.message.slice(0, 50) + '....' : notification.message}
            </p>
          </div>
        </Link>
      </div>
      <div
        className='acions'
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          fontSize: 10
        }}
      >
        <p
          style={{
            color: '#39e69e'
          }}
          onClick={() => handleRead(notification.id)}
        >
          Mark as read
        </p>
        <p
          style={{
            color: '#cc5050'
          }}
          onClick={() => handleDelete(notification.id)}
        >
          Delete
        </p>
      </div>
    </MenuItem>
  )
}

const userId = localStorage.getItem('userId')

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [permission, setPermission] = useState(Notification.permission)

  const rNotifications = useRealTimeNotifications(userId)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleRead = async id => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`
      await fetch(url, {
        method: 'PUT',
        credentials: 'include'
      })
      setNotifications(prev =>
        prev.map(notification => {
          if (notification.id === id) {
            return { ...notification, read: true }
          }
          return notification
        })
      )
    } catch (error) {
      console.error('Failed to mark notification as read', error)
    }
  }
  const handleDelete = async id => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}`
      await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      })
      setNotifications(prev => prev.filter(notification => notification.id !== id))
    } catch (error) {
      console.error('Failed to delete notification', error)
    }
  }

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(perm => setPermission(perm))
    }

    const fetchData = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/notifications/unread/${userId}`
        const res = await fetch(url, {
          method: 'GET',
          credentials: 'include'
        })
        const data = await res.json()

        setNotifications(data.data)
      } catch (error) {
        console.error('Failed to fetch notifications', error)
      }
    }

    setNotifications(prev => [...prev, ...rNotifications])

    fetchData()
  }, [rNotifications])

  return (
    <div>
      <IconButton
        aria-label='show notifications'
        id='notification-button'
        aria-controls={open ? 'notification-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <NotificationsIcon />
      </IconButton>
      <Menu
        id='notification-menu'
        sx={{
          '& .MuiMenu-paper': {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
            borderRadius: '10px',
            marginTop: '1rem'
          }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={handleClose}
            handleDelete={handleDelete}
            handleRead={handleRead}
          />
        ))}
      </Menu>
    </div>
  )
}