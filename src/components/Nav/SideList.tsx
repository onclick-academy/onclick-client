import * as React from 'react'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function SideList() {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      sx={{
        width: '50vh',
        maxWidth: 360,
        bgcolor: 'background.paper',
        zIndex: 999,
        height: '100vh',
        transition: 'all 2s ease-in-out'
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <Button
              sx={{
                // border: "1px solid black",
                padding: '10px 19px',
                borderRadius: '0px',
                color: '#5624d0',
                fontWeight: 'bold',
                textTransform: 'inherit',
                fontSize: '13px',
                textShadow: '1px 0 0px #90959c',
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: '#d1d7dca6'
                }
              }}
              href='/login'
            >
              Log in
            </Button>
            <Button
              sx={{
                border: '1px solid black',
                padding: '8px 16px',
                borderRadius: '0px',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'inherit',
                fontSize: '13px',
                textShadow: '1px 0 0px #90959c',
                backgroundColor: '#2d2f31',
                '&:hover': {
                  textDecoration: 'none',
                  backgroundColor: '#4c4d4f'
                }
              }}
              href='/signup'
            >
              Sign up
            </Button>
          </Box>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary='Inbox' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary='Starred' />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
