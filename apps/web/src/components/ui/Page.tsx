import { Container, Typography, Box } from "@mui/material";
import { ReactNode } from "react";

type PageProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

export function Page({ title, subtitle, children }: PageProps) {
  return (
    <Container sx={{ py: { xs: 3, sm: 5 } }}>
      {(title || subtitle) && (
        <Box sx={{ mb: 3 }}>
          {title && (
            <Typography variant="h4" fontWeight={800}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography color="text.secondary" mt={0.5}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {children}
    </Container>
  );
}
