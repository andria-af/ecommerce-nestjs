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
      },
    });

    // fallback seguro caso ainda não tenha seed
    return (
      row ?? {
        storeName: 'Minha Loja',
        whatsappNumber: '5551999999999',
        primaryColor: '#1976d2',
      }
    );
  }
}
