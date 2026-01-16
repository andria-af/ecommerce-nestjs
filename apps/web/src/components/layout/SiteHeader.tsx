"use client";

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

const navSx = {
  color: "text.primary",
  fontWeight: 500, // leve negrito
  px: 1.25,
  borderRadius: 2,
  textTransform: "none",
  "&:hover": {
    bgcolor: "rgba(17,24,39,0.06)",
  },
};

export function SiteHeader() {
  return (
    <AppBar elevation={0} position="sticky" color="transparent">
      <Box
        sx={{
          borderBottom: "1px solid rgba(17,24,39,0.08)",
          bgcolor: "rgba(250,250,250,0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ py: 1, display: "flex", gap: 2 }}>
            {/* Home */}
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

            <Box sx={{ flex: 1 }} />

            {/* Nav */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button component={Link} href="/#sobre" sx={navSx}>
                Sobre
              </Button>
              <Button component={Link} href="/#contato" sx={navSx}>
                Contato
              </Button>
              <Button component={Link} href="/store" sx={navSx}>
                Ver produtos
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </Box>
    </AppBar>
  );
}
