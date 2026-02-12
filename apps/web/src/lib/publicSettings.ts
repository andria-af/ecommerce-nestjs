import { apiGet } from "@/lib/api";

export type PublicSettings = {
  storeName: string;
  whatsappNumber: string | null;
  primaryColor: string;
  homeImageUrl?: string | null;
  instagramUrl?: string | null;
  logoUrl?: string | null;
};

export const DEFAULT_SETTINGS: PublicSettings = {
  storeName: "Minha Loja",
  whatsappNumber: null,
  primaryColor: "#1976d2",
  homeImageUrl: null,
  instagramUrl: null,
  logoUrl: null,
};

export async function getPublicSettingsSafe(): Promise<PublicSettings> {
  try {
    return await apiGet<PublicSettings>("/public/settings", { revalidate: 60 });
  } catch {
    return DEFAULT_SETTINGS;
  }
}
