import { apiGet } from "@/lib/api";

export interface IPublicSettings {
  storeName: string;
  whatsappNumber: string;
  primaryColor: string | null;
}

class PublicSettingsService {
  async get(): Promise<IPublicSettings> {
    return apiGet<IPublicSettings>("/public/settings");
  }
}

export default new PublicSettingsService();
