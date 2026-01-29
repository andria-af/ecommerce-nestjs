"use client";

import { useEffect, useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { apiGet } from "@/lib/api";

type PublicSettings = {
  instagramUrl: string | null;
  whatsappNumber: string | null;
};

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<PublicSettings | null>(null);

  useEffect(() => {
    apiGet<PublicSettings>("/public/settings").then(setSettings);
  }, []);

  const instagramHref = settings?.instagramUrl ?? "https://instagram.com";
  const whatsappHref = settings?.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}`
    : "https://wa.me/5551999999999";

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
          py: 1.25, // ↓ reduz altura do footer
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: 13 }} // ↓ texto menor
        >
          © {year} Todos os direitos reservados.
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            aria-label="Instagram"
            color="primary"
            size="small"
            component="a"
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="WhatsApp"
            color="primary"
            size="small"
            component="a"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
