import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private prisma: PrismaService) {}

  async get() {
    const row = await this.prisma.storeSettings.findFirst();
    return row;
  }

  async update(dto: UpdateSettingsDto) {
    const existing = await this.prisma.storeSettings.findFirst();

    if (!existing) {
      return this.prisma.storeSettings.create({
        data: {
          storeName: dto.storeName ?? 'Minha Loja',
          whatsappNumber: dto.whatsappNumber ?? '5551999999999',
          primaryColor: dto.primaryColor ?? null,
          instagramUrl: dto.instagramUrl ?? null,
          homeImageUrl: dto.homeImageUrl ?? null,
          logoUrl: dto.logoUrl ?? null,
        },
      });
    }

    return this.prisma.storeSettings.update({
      where: { id: existing.id },
      data: {
        storeName: dto.storeName ?? undefined,
        whatsappNumber: dto.whatsappNumber ?? undefined,
        primaryColor: dto.primaryColor ?? undefined,
        instagramUrl: dto.instagramUrl ?? undefined,
        homeImageUrl: dto.homeImageUrl ?? undefined,
        logoUrl: dto.logoUrl ?? undefined,
      },
    });
  }
}
