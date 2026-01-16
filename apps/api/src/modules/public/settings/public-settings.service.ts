import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (!row) {
      throw new NotFoundException('Store settings not found');
    }

    return row;
  }
}
