import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class AdminProductsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async get(id: string) {
    const row = await this.prisma.product.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Product not found');
    return row;
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        priceCents: dto.priceCents ?? null,
        imageUrl: dto.imageUrl ?? null,
        active: dto.active ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.get(id);
    return this.prisma.product.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        priceCents: dto.priceCents ?? undefined,
        imageUrl: dto.imageUrl ?? undefined,
        active: dto.active ?? undefined,
      },
    });
  }

  async remove(id: string) {
    await this.get(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
