import { Module } from '@nestjs/common';
import { PublicLeadsController } from './public-leads.controller';
import { PublicLeadsService } from './public-leads.service';

@Module({
  controllers: [PublicLeadsController],
  providers: [PublicLeadsService],
})
export class PublicLeadsModule {}
