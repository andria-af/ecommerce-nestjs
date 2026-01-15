import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PublicProductsService } from './public-products.service';

@Controller('public/products')
export class PublicProductsController {
  constructor(private service: PublicProductsService) {}

  @Get()
  async list() {
    return this.service.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.service.getById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
