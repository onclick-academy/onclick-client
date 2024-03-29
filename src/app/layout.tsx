'use client'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightBlue } from '@mui/material/colors'
import Navbar from '@/components/Nav/Nav'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: lightBlue[100],
      main: lightBlue[200],
      dark: lightBlue[400]
    }
  },
  typography: {
    subtitle1: {
      fontSize: 12
    },
    body1: {
      fontWeight: 500
    },
    h4: {
      color: 'rgba(66, 107, 219, 0.815)'
    }
  }
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
