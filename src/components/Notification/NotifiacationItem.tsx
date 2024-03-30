import { MenuItem } from '@mui/material'
import Link from 'next/link'
import { getNotificationIcon } from './NotificationIcons'
import { NotificationI } from '.'

interface NotifiacationItemProps {
  notification: NotificationI
  onClose: () => void
  handleRead: (id: string) => void
  handleDelete: (id: string) => void
  setAllNotifications: any
}

const NotificationItem = ({ notification, handleRead, handleDelete, setAllNotifications }: NotifiacationItemProps) => {
  return (
    <MenuItem
      sx={{
        border: notification.isRead ? '1.5px solid #3d3d3d' : '1.5px solid #3970e6'
      }}
      id='notification-container-item'
      key={notification.id}
      onClick={() => {
        handleRead(notification.id)
        setAllNotifications((prev: NotificationI[]) =>
          prev.map((item: NotificationI) => {
            if (item.id === notification.id) {
              item.isRead = true
            }
            return item
          })
        )
      }}
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

export default NotificationItem
