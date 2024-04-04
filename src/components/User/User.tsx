'use client'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { fetcher } from '@/utilities/fetcher'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import Link from 'next/link'

interface UserI {
  id: number
  email: string
  profilePic: string
}

export default function AccountMenu() {
  const [userData, setUserData] = useState({} as UserI)
  useEffect(() => {
    const getUserData = async () => {
      const res = await fetcher({ url: '/users/userinfo' })
      return res
    }

    const fetchData = async () => {
      const fetchedUserData = await getUserData()
      setUserData(fetchedUserData.data)
    }
    fetchData()
  }, [])

  const handleLogOut = async () => {
    const res = await fetcher({ url: '/auth/logout' })
    if (res.status === 'success') {
      window.location.href = '/'
    }
  }

  // console.log(userData)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    userData && (
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title='Account settings'>
            <IconButton
              onClick={handleClick}
              size='small'
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={userData.profilePic} sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar src={userData.profilePic} sx={{ width: 32, height: 32 }} /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FavoriteOutlinedIcon fontSize='small' />
            </ListItemIcon>
            <Link href='/user/wishlist' style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              WishList
            </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShoppingCartOutlinedIcon fontSize='small' />
            </ListItemIcon>
            My Cart
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize='small' />
            </ListItemIcon>
            <Link href='/user/settings' style={{ color: 'white', textDecoration: 'none' }}>
              {' '}
              Settings
            </Link>
          </MenuItem>

          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    )
  )
}
