import { Container, Typography, Box } from "@mui/material";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/material/styles";

type PageProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
  containerMaxWidth?: "sm" | "md" | "lg" | "xl";
  titleSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
};

export function Page({
  title,
  subtitle,
  children,
  fullWidth = false,
  containerMaxWidth = "lg",
  titleSx,
  subtitleSx,
}: PageProps) {
  const content = (
    <>
      {(title || subtitle) && (
        <Box sx={{ mb: 3 }}>
          {title && (
            <Typography variant="h4" fontWeight={800} sx={titleSx}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography color="text.secondary" mt={0.5} sx={subtitleSx}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </>
  );

  if (fullWidth) return <Box sx={{ py: { xs: 3, sm: 5 } }}>{content}</Box>;

  return (
    <Container maxWidth={containerMaxWidth} sx={{ py: { xs: 3, sm: 5 } }}>
      {content}
    </Container>
  );
}
