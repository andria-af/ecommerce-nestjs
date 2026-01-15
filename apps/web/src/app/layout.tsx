import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry";
import { apiGet } from "@/lib/api";

type Settings = {
  storeName: string;
  whatsappNumber: string;
  primaryColor: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await apiGet<Settings>("/public/settings");

  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <ThemeRegistry primaryColor={settings.primaryColor}>
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
