import { createTheme, alpha, lighten } from "@mui/material/styles";

export function buildTheme(
  accentColor?: string,
  mode: "light" | "dark" = "light",
) {
  const primary = accentColor && accentColor.trim() ? accentColor : "#8b5c99";

  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: { main: primary },
      background: isDark
        ? {
            default: "#1f1726", // roxo escuro elegante
            paper: "#2a1f33", // card roxo escuro claro
          }
        : {
            default: lighten(primary, 0.92),
            paper: "#ffffff",
          },

      text: isDark
        ? {
            primary: "#f5f3f7",
            secondary: alpha("#f5f3f7", 0.7),
          }
        : {
            primary: "#57585a",
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
      button: { textTransform: "none", fontWeight: 500 },
    },

    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            boxShadow: isDark
              ? "0 10px 30px rgba(0,0,0,0.45)"
              : "0 10px 30px rgba(17,24,39,0.06)",
          },
        },
      },
    },
  });
}
