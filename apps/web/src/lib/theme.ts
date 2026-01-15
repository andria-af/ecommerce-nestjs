import { createTheme } from "@mui/material/styles";

export function buildTheme(primaryColor?: string) {
  return createTheme({
    palette: {
      primary: {
        main:
          primaryColor && primaryColor.trim() !== "" ? primaryColor : "#1976d2",
      },
    },
    shape: { borderRadius: 12 },
  });
}
