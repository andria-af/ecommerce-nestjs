"use client";

import { Box, Container, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(17,24,39,0.08)",
        bgcolor: "background.paper",
      }}
    >
      <Container
        sx={{
          py: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {year} Todos os direitos reservados.
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            aria-label="Instagram"
            color="primary"
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            aria-label="WhatsApp"
            color="primary"
            component="a"
            href="https://wa.me/5551999999999"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
