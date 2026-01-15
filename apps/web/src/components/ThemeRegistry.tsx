"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
  primaryColor?: string;
};

export default function ThemeRegistry({ children, primaryColor }: Props) {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main:
              primaryColor && primaryColor.trim() ? primaryColor : "#1976d2",
          },
        },
      }),
    [primaryColor]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
