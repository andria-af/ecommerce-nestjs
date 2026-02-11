import { apiPost } from "@/lib/api";

export interface IUploadResponse {
  url: string;
}

class UploadService {
  async uploadImage(file: File): Promise<IUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    // não setar Content-Type manualmente (boundary)
    return apiPost<IUploadResponse>("/upload", formData);
  }
}

export default new UploadService();
