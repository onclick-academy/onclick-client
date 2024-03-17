"use client";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightBlue } from "@mui/material/colors";
import Navbar from "@/components/Nav/Nav";
import Header from "@/components/Header/Header";
import Main from "@/components/Main/Main";
import MySwiper from "@/components/Swiper/MySwiper";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: lightBlue[100],
      main: lightBlue[200],
      dark: lightBlue[400],
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header />
          <MySwiper width="50px" height="50px" />
          <Main />

          <main className={styles.main}>
            <div className={styles.center}>
              <div className={styles.logo} />
            </div>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
