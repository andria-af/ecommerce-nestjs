"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { buildTheme } from "@/lib/theme";

type Props = {
  children: React.ReactNode;
  primaryColor?: string;
  mode?: "light" | "dark";
};

export default function ThemeRegistry({
  children,
  primaryColor,
  mode = "light",
}: Props) {
  const theme = React.useMemo(
    () => buildTheme(primaryColor, mode),
    [primaryColor, mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
