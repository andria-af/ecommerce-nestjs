import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class PublicSettingsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const row = await this.prisma.storeSettings.findFirst({
      select: {
        storeName: true,
        whatsappNumber: true,
        primaryColor: true,
        instagramUrl: true,
        homeImageUrl: true,
      },
    });

    if (!row) {
      return {
        storeName: 'Minha Loja',
        whatsappNumber: null,
        primaryColor: '#1976d2',
        instagramUrl: null,
        homeImageUrl: null,
      };
    }

    return row;
  }
}
