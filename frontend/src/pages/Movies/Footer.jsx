import React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ArrowUpward,
} from "@mui/icons-material";

import logo from "../../assets/logo.png";

const Footer = () => {
  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2D2D2D",
        color: "#FFFFFF",
        padding: "40px 0",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center", // Centers items vertically
        height: "300px", // Increased height of footer
      }}
    >
      {/* Logo Section */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          <Link href="/">
            <img src={logo} alt="" style={{ width: "250px", height: "70px" }} />
          </Link>
        </Typography>
      </Box>

      {/* Quick Links Section */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            borderBottom: "2px solid #FFFFFF", // Add underline
            display: "inline-block",
          }}
        >
          Quick Links
        </Typography>
        <Link
          href="/"
          underline="none"
          color="inherit"
          sx={{
            display: "block",
            mb: 1,
            "&:hover": {
              color: "#1976d2", // Change color on hover
              textDecoration: "underline", // Add underline on hover
            },
          }}
        >
          Home
        </Link>
        <Link
          href="about"
          underline="none"
          color="inherit"
          sx={{
            display: "block",
            mb: 1,
            "&:hover": {
              color: "#1976d2",
              textDecoration: "underline",
            },
          }}
        >
          About
        </Link>
        <Link
          href="#"
          underline="none"
          color="inherit"
          sx={{
            display: "block",
            mb: 1,
            "&:hover": {
              color: "#1976d2",
              textDecoration: "underline",
            },
          }}
        >
          For You
        </Link>
        <Link
          href="profile"
          underline="none"
          color="inherit"
          sx={{
            display: "block",
            mb: 1,
            "&:hover": {
              color: "#1976d2",
              textDecoration: "underline",
            },
          }}
        >
          Profile
        </Link>
      </Box>

      {/* Community Section */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            mb: 1,
            borderBottom: "2px solid #FFFFFF", // Add underline
            display: "inline-block",
          }}
        >
          Community
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            href="#"
            sx={{
              "&:hover": {
                color: "#1976d2",
              },
              "&:active": {
                transform: "scale(0.9)", // Click effect (scale down slightly)
              },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            sx={{
              "&:hover": {
                color: "#1976d2",
              },
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            sx={{
              "&:hover": {
                color: "#1976d2",
              },
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            color="inherit"
            href="#"
            sx={{
              "&:hover": {
                color: "#1976d2",
              },
              "&:active": {
                transform: "scale(0.9)",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>

      {/* Scroll to Top Button */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
        <IconButton
          onClick={scrollToTop}
          sx={{ backgroundColor: "#1976d2", color: "#FFFFFF" }}
        >
          <ArrowUpward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
