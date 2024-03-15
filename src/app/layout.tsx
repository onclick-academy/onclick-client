'use client'
import '../styles/step1.scss'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import '../styles/globals.scss'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightBlue } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: lightBlue[100],
      main: lightBlue[200],
      dark: lightBlue[400]
    }
  }
})

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <main className={styles.main}>
            <div className={styles.center}>
              <div className={styles.logo} />
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
