import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ShoppingCartOutlined } from "@mui/icons-material";
import logo2 from "../../img/logo2.png";
import logo3 from "../../img/logo3.png";
import Image from "next/image";
import { LanguageRounded } from "@mui/icons-material";
import NestedList from "../Pops&Drops/TabPanel";

const LogoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "4%",
  height: "74px",
}));

const Logo = styled(Image)({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "1",
  transition: "opacity 0.3s",
});

const LogoHover = styled(Image)({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "0",
  opacity: "0",
  transition: "opacity 0.3s",
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  flexGrow: "1",
  borderBottom: "1px solid transparent",
  borderh: "1px",
  padding: "4px ",
  borderRadius: "0px",
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    borderRadius: "40px"
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0, 1.5, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [listshover, setListshover] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "74px",
        backgroundColor: "transparent",
        border: "none",
        position: "relative",
        zIndex: 50,
      }}
    >
      <Toolbar>
        <LogoContainer
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Logo
            src={logo2}
            alt="logo"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          />
          <LogoHover
            src={logo3}
            alt="logo"
            style={{
              opacity: isHovered ? 0 : 1,
            }}
          />
        </LogoContainer>
        <Typography
          noWrap
          component="div"
          variant="body2"
          sx={{
            display: {
              xs: "none",
              sm: "block",

              cursor: "pointer",
              marginLeft: "1%",
              marginTop: "0.6%",
              fontSize: "15px",
              color: "white",
              "&:hover": {
                textDecoration: "none",
                color: "#5624d0",
              },
            },
          }}
          onMouseEnter={() => setListshover(true)}
        >
          Categories
          {listshover && <NestedList/>}
          {/* Display CategoriesPop component when hovered */}
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: "#97999b" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for anything"
            inputProps={{ "aria-label": "search" }}
            sx={{
              fontSize: "15px",
              width: "100%",
              "&:hover:": { backgroundColor:"white" },
            }}
          />
        </Search>
        {/* <Box sx={{ flexGrow: 1, backgroundColor: "red" }} /> */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
              width: "44%",
              alignItems: "center",
              paddingLeft: "20px",
              gap: "20px",
            },
          }}
        >
          <Typography
            noWrap
            component="div"
            variant="body2"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                cursor: "pointer",
                marginLeft: "1%",
                marginTop: "0.6%",
                fontSize: "13px",
                color: "white",
                "&:hover": {
                  textDecoration: "none",
                  color: "#5624d0",
                },
              },
            }}
          >
            Academy Business
          </Typography>
          <Typography
            noWrap
            component="div"
            variant="body2"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                cursor: "pointer",
                marginLeft: "1%",
                marginTop: "0.6%",
                fontSize: "13px",
                color: "white",
                textShadow: "0 0 0px #2d2f31",
                "&:hover": {
                  textDecoration: "none",
                  color: "#5624d0",
                },
              },
            }}
          >
            Teach on Academy
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{
              color: "white",
              "&:hover": {
                textDecoration: "none",
                color: "#5624d0",
                backgroundColor: "transparent",
              },
            }}
          >
            <ShoppingCartOutlined />
          </IconButton>
          <Box sx={{ marginLeft: "2%", display: "flex", gap: "8px" }}>
            <Button
              sx={{
                // border: "1px solid black",
                padding: "8px 19px",
                borderRadius: "0px",
                color: "#5624d0",
                fontWeight: "bold",
                textTransform: "inherit",
                fontSize: "13px",
                textShadow: "1px 0 0px #90959c",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "#d1d7dca6",
                },
              }}
            >
              Log in
            </Button>
            <Button
              sx={{
                border: "1px solid black",
                padding: "8px 16px",
                borderRadius: "0px",
                color: "white",
                fontWeight: "bold",
                textTransform: "inherit",
                fontSize: "13px",
                textShadow: "1px 0 0px #90959c",
                backgroundColor: "#2d2f31",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "#4c4d4f",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            sx={{
              color: "white",
              // border: "1px solid black",
              borderRadius: "0",
              padding: "7px",
              "&:hover": {
                textDecoration: "none",
                color: "#5624d0",
                rotate: "180deg",
                transition: "0.8s",
                backgroundColor: "transparent",
              },
            }}
          >
            <LanguageRounded />
          </IconButton>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
