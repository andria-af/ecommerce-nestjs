import { createTheme } from "@mui/material/styles";

export function buildTheme(accentColor?: string) {
  const primary = accentColor && accentColor.trim() ? accentColor : "#eb2525";

  return createTheme({
    palette: {
      mode: "light",
      primary: { main: primary },
      background: {
        default: "#fafafa",
        paper: "#ffffff",
      },
      text: {
        primary: "#111827",
        secondary: "#6b7280",
      },
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Arial",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontWeight: 400 },
      body2: { fontWeight: 400 },
      button: { textTransform: "none", fontWeight: 500 },
    },
    components: {
      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 12 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            border: "1px solid rgba(17,24,39,0.08)",
            boxShadow: "0 10px 30px rgba(17,24,39,0.06)",
          },
        },
      },
      MuiLink: {
        defaultProps: { underline: "none" },
      },
    },
  });
}
