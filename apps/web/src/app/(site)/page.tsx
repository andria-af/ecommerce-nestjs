import { Box, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { apiGet } from "@/lib/api";

type PublicSettings = {
  homeImageUrl: string | null;
};

export default async function HomePage() {
  const settings = await apiGet<PublicSettings>("/public/settings");
  return (
    <Box
      sx={{
        flex: 1, // 🔑 ocupa todo o espaço disponível
        display: "flex",
        alignItems: "center", // centraliza verticalmente
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: settings.homeImageUrl
            ? `url(${settings.homeImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
          zIndex: 0,
        }}
      />

      {/* Conteúdo */}
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 0.8fr" },
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h3"
            color="primary.main"
            sx={{ fontWeight: 700 }}
          >
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
            sx={{ mt: 1.5, fontSize: 18, lineHeight: 1.7 }}
          >
            Beleza com naturalidade e estratégia.
          </Typography>
        </Box>

        {/* Card decorativo */}
        {/* <Box
          sx={{
            height: { xs: 220, md: 320 },
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "1px solid rgba(17,24,39,0.08)",
            boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
          }}
        /> */}
      </Container>
    </Box>
  );
}
