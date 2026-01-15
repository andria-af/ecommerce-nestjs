import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

function buildWhatsappUrl(whatsappNumber: string, message: string) {
  const clean = whatsappNumber.replace(/\D/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${clean}?text=${text}`;
}

@Injectable()
export class PublicLeadsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeadDto) {
    const product = await this.prisma.product.findFirst({
      where: { id: dto.productId, active: true },
      select: { id: true, title: true, priceCents: true },
    });

    if (!product) throw new BadRequestException('Invalid product');

    const settings = (await this.prisma.storeSettings.findFirst({
      select: { whatsappNumber: true, storeName: true },
    })) ?? { whatsappNumber: '5551999999999', storeName: 'Minha Loja' };

    const price =
      typeof product.priceCents === 'number'
        ? ` - R$ ${(product.priceCents / 100).toFixed(2).replace('.', ',')}`
        : '';

    const customer = dto.customerName?.trim();
    const message = customer
      ? `Olá! Sou ${customer} e tenho interesse em: ${product.title}${price}. (${settings.storeName})`
      : `Olá! Tenho interesse em: ${product.title}${price}. (${settings.storeName})`;

    const whatsappUrl = buildWhatsappUrl(settings.whatsappNumber, message);

    await this.prisma.lead.create({
      data: {
        productId: product.id,
        customerName: customer || null,
        message,
      },
    });

    return { whatsappUrl };
  }
}
