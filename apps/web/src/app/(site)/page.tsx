import { Box, Container, Typography } from "@mui/material";
import { apiGet } from "@/lib/api";
import { assetUrl } from "@/lib/assetUrl";

type PublicSettings = {
  homeImageUrl: string | null;
  primaryColor: string;
};

export default async function HomePage() {
  const settings = await apiGet<PublicSettings>("/public/settings");
  const bg = assetUrl(settings.homeImageUrl);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100dvh - var(--site-header-h) - var(--site-footer-h))",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: settings.primaryColor,
          backgroundImage: bg ? `url("${bg}")` : "none",
          backgroundSize: "contain",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "normal",
          zIndex: 0,
          opacity: 0.75,
        }}
      />

      {/* Conteúdo */}
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          py: { xs: 6, md: 10 },
        }}
      >
        <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
          Bruna Fukami
        </Typography>

        <Typography
          variant="h3"
          color="text.secondary"
          sx={{ fontWeight: 700 }}
        >
          Biomédica Esteta
        </Typography>

        <Typography
          color="text.secondary"
          sx={{
            mt: 1.5,
            fontSize: 18,
            lineHeight: 1.7,
            maxWidth: 520,
          }}
        >
          Beleza com naturalidade e estratégia.
        </Typography>
      </Container>
    </Box>
  );
}
