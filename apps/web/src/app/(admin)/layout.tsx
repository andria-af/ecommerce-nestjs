"use client";

import { Box, Container } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry mode="dark">
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: 4,
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </ThemeRegistry>
  );
}
