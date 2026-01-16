"use client";

import * as React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { buildTheme } from "@/lib/theme";

type Props = {
  children: React.ReactNode;
  primaryColor?: string;
};

export default function ThemeRegistry({ children, primaryColor }: Props) {
  const theme = React.useMemo(() => buildTheme(primaryColor), [primaryColor]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
