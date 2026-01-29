"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export function SiteHeader() {
  const [settingsHref, setSettingsHref] = useState("/admin/login");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setSettingsHref(token ? "/admin/settings" : "/admin/login");
  }, []);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="transparent"
      sx={{ zIndex: 1200 }}
    >
      <Box
        sx={{
          borderBottom: "1px solid rgba(17,24,39,0.08)",
          bgcolor: "rgba(250,250,250,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ py: 1, display: "flex", gap: 2 }}>
            <IconButton
              component={Link}
              href="/"
              aria-label="Início"
              sx={{
                color: "primary.main",
                border: "1px solid rgba(17,24,39,0.10)",
                borderRadius: 2,
              }}
            >
              <HomeOutlinedIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                component={Link}
                href="/"
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  px: 1.25,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                href="/store"
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  px: 1.25,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Ver produtos
              </Button>
            </Box>

            <Box sx={{ flex: 1 }} />

            <IconButton
              component={Link}
              href={settingsHref}
              aria-label="Configurações"
              sx={{
                color: "text.primary",
                border: "1px solid rgba(17,24,39,0.10)",
                borderRadius: 2,
              }}
            >
              <SettingsOutlinedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
}
