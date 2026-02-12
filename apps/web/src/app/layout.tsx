import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import ThemeRegistry from "@/components/ThemeRegistry";
import { getPublicSettingsSafe } from "@/lib/publicSettings";

export const dynamic = "force-dynamic";

type Settings = {
  storeName: string;
  whatsappNumber: string | null;
  primaryColor: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings: Settings | null = null;

  try {
    settings = await getPublicSettingsSafe();
  } catch {
    settings = null;
  }

  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <ThemeRegistry primaryColor={settings?.primaryColor} mode="light">
            {children}
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
