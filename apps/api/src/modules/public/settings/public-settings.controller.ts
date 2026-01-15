import { Controller, Get } from '@nestjs/common';
import { PublicSettingsService } from './public-settings.service';

@Controller('public/settings')
export class PublicSettingsController {
  constructor(private service: PublicSettingsService) {}

  @Get()
  async get() {
    return this.service.get();
  }
}
