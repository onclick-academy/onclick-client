import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import './notification.scss' // Assuming styles are defined here
import NotificationItem from './NotifiacationItem'
import { NotifiacationType } from './NotificationIcons'
import { useNotifications } from './utiliy'
import { checkNotificationPermissionAndRegisterToken, getDeviceToken } from '@/utilities/device'
import { Badge, Button } from '@mui/material'

const ITEM_HEIGHT = 100

export interface NotificationI {
  createdAt: string
  id: string
  title: string
  message: string
  link: string
  type: NotifiacationType
  isRead: boolean
}

const userId = localStorage.getItem('userId')

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [permission, setPermission] = useState(false)
  const [allNotifications, setAllNotifications] = useState<NotificationI[]>([])

  const { handleDelete, handleRead } = useNotifications(userId, setAllNotifications)
  const unreadNumber = allNotifications.filter(notification => !notification.isRead).length

  const open = Boolean(anchorEl)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (!userId) {
      console.error('User ID not found')
      return
    }
    const initDeviceToken = async () => {
      const isDeviceToken = await checkNotificationPermissionAndRegisterToken(userId)
      setPermission(isDeviceToken)
    }
    initDeviceToken()
  }, [])

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
        <Badge
          badgeContent={unreadNumber}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#b14d4d',
              color: '#fff',
              right: '-5px',
              top: '-5px'
            }
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id='notification-menu'
        className='notification-menu'
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
        {allNotifications
          .sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          .map((notification: NotificationI) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={handleClose}
              handleDelete={handleDelete}
              handleRead={handleRead}
              setAllNotifications={setAllNotifications}
            />
          ))}
        {!permission && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              border: '1px solid #f18181',
              marginInline: '1rem',
              borderRadius: '10px',
              padding: '1rem',
              gap: '4px'
            }}
          >
            <p>Please Allow Notificarions</p>
            <Button
              sx={{
                fontSize: '0.8rem'
              }}
              onClick={async () => {
                await checkNotificationPermissionAndRegisterToken(userId)
              }}
              variant='outlined'
            >
              Allow
            </Button>
          </div>
        )}
      </Menu>
    </div>
  )
}
