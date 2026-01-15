import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class PublicProductsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        priceCents: true,
        imageUrl: true,
      },
    });
  }

  async getById(id: string) {
    return this.prisma.product.findFirst({
      where: { id, active: true },
      select: {
        id: true,
        title: true,
        description: true,
        priceCents: true,
        imageUrl: true,
      },
    });
  }
}
