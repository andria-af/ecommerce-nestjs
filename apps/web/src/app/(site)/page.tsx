import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { apiGet } from "@/lib/api";
import { assetUrl } from "@/lib/assetUrl";

type PublicSettings = {
  homeImageUrl: string | null;
  primaryColor: string;
  whatsappNumber: string | null;
};

export default async function HomePage() {
  const settings = await apiGet<PublicSettings>("/public/settings");
  const bg = assetUrl(settings.homeImageUrl);

  const whatsappHref = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}`
    : "https://wa.me/5551999999999";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100dvh - var(--site-header-h) - var(--site-footer-h))",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background com imagem full + overlay em gradiente */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: bg ? `url("${bg}")` : "none",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              90deg,
              ${settings.primaryColor}cc 0%,
              ${settings.primaryColor}99 35%,
              ${settings.primaryColor}33 60%,
              rgba(0,0,0,0) 80%
            )`,
          },
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
        <Stack spacing={2.2} maxWidth={560}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: "italic",
              fontWeight: 500,
              letterSpacing: "0.04em",
              lineHeight: 1.05,
              color: "#fff",
            }}
          >
            Bruna Fukami
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              lineHeight: 1.15,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Biomédica Esteta
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: 16, sm: 18 },
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 480,
            }}
          >
            Beleza com naturalidade e estratégia. Procedimentos personalizados
            para realçar sua melhor versão.
          </Typography>

          {/* CTAs */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 3.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                bgcolor: "#fff",
                color: settings.primaryColor,
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
              href="/store"
            >
              Ver serviços
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 3.5,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": {
                  borderColor: "#fff",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              component="a"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar pelo WhatsApp
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
