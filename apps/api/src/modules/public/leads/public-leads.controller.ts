import { Body, Controller, Post } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PublicLeadsService } from './public-leads.service';

@Controller('public/leads')
export class PublicLeadsController {
  constructor(private service: PublicLeadsService) {}

  @Post()
  async create(@Body() dto: CreateLeadDto) {
    return this.service.create(dto);
  }
}
