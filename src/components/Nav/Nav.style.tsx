import { Box } from '@mui/material'
import InputBase from '@mui/material/InputBase'
import { styled, alpha } from '@mui/material/styles'
import Image from 'next/image'

const Container = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%'
})

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '60px',
  height: '74px'
}))

const Logo = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
  transition: 'opacity 0.3s'
})

const LogoHover = styled(Image)({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '0',
  opacity: '0',
  transition: 'opacity 0.3s'
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  flexGrow: '1',
  borderBottom: '1px solid transparent',
  borderh: '1px',
  padding: '4px ',
  borderRadius: '0px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    borderRadius: '40px'
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0, 1.5, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
  zIndex: 979 // Ensure the overlay appears above other content
})

export { Container, LogoContainer, Logo, LogoHover, Search, SearchIconWrapper, StyledInputBase, Overlay }
