import { Box } from "@mui/material";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SiteHeader />

      {/* Área flexível */}
      <Box component="main" sx={{ flex: 1, display: "flex" }}>
        {children}
      </Box>

      <SiteFooter />
    </Box>
  );
}
