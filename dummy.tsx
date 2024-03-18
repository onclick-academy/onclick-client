import React from "react";
import logo from "../../img/logo.png";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { AddBox } from "@mui/icons-material";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        height: "72px",
        backgroundColor: "#fff",
        borderBottom: "2px solid #ddd",
        boxShadow: "inherit",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "flex-start",
          paddingX: "20px",

          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ height: "72px", width: "10%", position: "relative" }}>
          <Link href="/" passHref>
            <Image
              src={logo}
              alt="logo"
              style={{
                height: "150%",
                width: "120%",
                objectFit: "cover",
                position: "absolute",
                left: "0",
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: { xs: "100%", md: "55%" },
            marginBottom: { xs: "10px", md: "0" },
          }}
        >
          <Link href="/" passHref style={{ width: "15%", marginLeft: "5%" }}>
            lol
          </Link>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f1f1f1",
              borderRadius: "40px",
              border: "1.5px solid #4c4d4f",
              padding: "7px",
              width: { xs: "80%", md: "100%", lg: "100%" },
              marginTop: { xs: "10px", md: "4px" },
            }}
          >
            <SearchIcon sx={{ marginRight: "5px", color: "#919394" }} />
            <InputBase
              placeholder="Search..."
              sx={{ width: "100%" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
        </Box>
        {/* Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "normal",
            marginLeft: "2%",
            backgroundColor: "red",
            width: { xs: "100%", md: "45%" },
          }}
        >
          <Button color="inherit" sx={{ marginRight: "10px" }}>
            <Link href="/courses" passHref>
              Courses
            </Link>
          </Button>
          <Button color="inherit" sx={{ marginRight: "10px" }}>
            <Link href="/about" passHref>
              About
            </Link>
          </Button>
          <Button color="inherit" sx={{ marginRight: "10px" }}>
            Sign Up
          </Button>
          <Button color="inherit">
            <Link href="/login" passHref>
              Login
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
