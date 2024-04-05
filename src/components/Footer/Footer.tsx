import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Toolbar, Typography, Container, Link } from '@mui/material'
import Logo3 from '../../img/logo3.png'
import Image from 'next/image'
import RoomIcon from '@mui/icons-material/Room'
import EmailIcon from '@mui/icons-material/Email'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// Styled components
const StyledFooter = styled(Box)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  height: '300px',
  backgroundColor: 'rgb(35, 45, 63)'
}))

const FooterContent = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12%',
  padding: '20px 20px'
})

const Logo = styled('div')({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  width: '18%'
})

const LogoImage = styled('img')({
  width: '50px', // Adjust as needed
  marginRight: '10px' // Adjust as needed
})

const Section = styled('a')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  marginTop: '2%'
})

const SectionTitle = styled(Typography)({
  color: '#fff',
  marginBottom: '5px'
})

const LinkList = styled('div')({
  display: 'flex',
  flexDirection: 'column'
})

const FooterLink = styled(Link)({
  marginBottom: '3px',
  textDecoration: 'none',
  color:"#c6cbd4",
  '&:hover': {
    textDecoration: 'none',
    color:"#553CDF",
  }
})

const Footer = () => {
  return (
    <StyledFooter position='static'>
      <FooterContent>
        <Logo>
          <Image src={Logo3} alt='Logo' width={70} style={{ marginBottom: '3%' }} />
          <Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'capitalize', color: '#ced2da' }}>
            We are passionate education dedicated to providing high-quality resources learners all backgrounds.{' '}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'start',
              gap: '3%',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'end',
            }}
          >
            <Typography sx={{ color: '#bbbfc7', marginTop: '3%', display:"flex", alignItems:"center", gap:"2%" }}>
              <RoomIcon sx={{ color: '#553CDF', marginBottom:"5%" }} /> Cairo,Egypt
            </Typography>
            <Typography sx={{ color: '#bbbfc7', marginTop: '3%', display:"flex",gap:"2%"  }}>
              <EmailIcon sx={{ color: '#553CDF',marginBottom:"2%" }} /> onclick.organization@gmail.com
            </Typography>
          </Box>
        </Logo>
        {/* Sections */}
        <Section>
          <SectionTitle variant='subtitle1' sx={{ color: 'black', fontSize: '17px', fontWeight: 'bold' }}>
            Quick Links
          </SectionTitle>
          <LinkList>
            <FooterLink href='#'>Latest Courses</FooterLink>
            <FooterLink href='#'>Mission & Vision</FooterLink>
            <FooterLink href='#'>Join a Carrer</FooterLink>
            <FooterLink href='#'>Zoom Meeting</FooterLink>
            <FooterLink href='#'>Pricing Plan</FooterLink>
          </LinkList>
        </Section>
        <Section>
          <SectionTitle variant='subtitle1' sx={{ color: 'black', fontSize: '17px', fontWeight: 'bold' }}>
            Explore
          </SectionTitle>
          <LinkList >
            <FooterLink href='#'>Course One</FooterLink>
            <FooterLink href='#'>Course Two</FooterLink>
            <FooterLink href='#'>Create Course</FooterLink>
            <FooterLink href='#'>Lesson Details</FooterLink>
            <FooterLink href='#'>Instructor</FooterLink>
          </LinkList>
        </Section>
        <Section>
          <SectionTitle variant='subtitle1' sx={{ color: 'black', fontSize: '17px', fontWeight: 'bold' }}>
            Newsletter
          </SectionTitle>
          <Typography sx={{ fontSize: '16px', textTransform: 'capitalize', color: '#ced2da', width: '80%' }}>
            Subscribe Our newsletter get update our new course
          </Typography>
          <Box sx={{ display: 'flex', position: 'relative', marginTop: '7%' }}>
            <TextField id='outlined-basic' label='Contact Us' variant='outlined' />
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#4f35e2',
                color: 'white',
                position: 'absolute',
                right: 5,
                height: '45px',
                width: '30%',
                marginTop: '2%',
                '&:hover': {
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: '1px solid #4f35e2'
                }
              }}
            >
              Send
            </Button>
          </Box>
        </Section>
      </FooterContent>
    </StyledFooter>
  )
}

export default Footer
