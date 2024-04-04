import React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Container, Link } from "@mui/material";

// Styled components
const StyledFooter = styled(AppBar)(({ theme }) => ({
  top: "auto",
  bottom: 0,
  backgroundImage: ' linear-gradient(-20deg, #232425 0%, #4e4376 100%)',
}));

const FooterContent = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
});

const Logo = styled("div")({
  display: "flex",
  alignItems: "center",
});

const LogoImage = styled("img")({
  width: "50px", // Adjust as needed
  marginRight: "10px", // Adjust as needed
});

const Section = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const SectionTitle = styled(Typography)({
  color: "#fff",
  marginBottom: "5px",
});

const LinkList = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const FooterLink = styled(Link)({
  color: "#fff",
  marginBottom: "3px",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = () => {
  return (
    <StyledFooter position="static">
      <Toolbar>
        <FooterContent>
          {/* Logo */}
          <Logo>
            <LogoImage src="/your_logo.png" alt="Logo" />
            <Typography variant="h6">Your Logo</Typography>
          </Logo>
          {/* Sections */}
          <Section>
            <SectionTitle variant="subtitle1">Section 1</SectionTitle>
            <LinkList>
              <FooterLink href="#">Link 1</FooterLink>
              <FooterLink href="#">Link 2</FooterLink>
              <FooterLink href="#">Link 3</FooterLink>
              <FooterLink href="#">Link 4</FooterLink>
              <FooterLink href="#">Link 5</FooterLink>
            </LinkList>
          </Section>
          <Section>
            <SectionTitle variant="subtitle1">Section 2</SectionTitle>
            <LinkList>
              <FooterLink href="#">Link 1</FooterLink>
              <FooterLink href="#">Link 2</FooterLink>
              <FooterLink href="#">Link 3</FooterLink>
              <FooterLink href="#">Link 4</FooterLink>
              <FooterLink href="#">Link 5</FooterLink>
            </LinkList>
          </Section>
        </FooterContent>
      </Toolbar>
    </StyledFooter>
  );
};

export default Footer;
