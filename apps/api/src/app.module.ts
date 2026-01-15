import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PublicProductsModule } from './modules/public/products/public-products.module';
import { PublicSettingsModule } from './modules/public/settings/public-settings.module';
import { PublicLeadsModule } from './modules/public/leads/public-leads.module';
import { AuthModule } from './modules/admin/auth/auth.module';
import { AdminProductsModule } from './modules/admin/products/admin-products.module';
import { AdminSettingsModule } from './modules/admin/settings/admin-settings.module';

@Module({
  imports: [
    PrismaModule,
    PublicProductsModule,
    PublicSettingsModule,
    PublicLeadsModule,
    AuthModule,
    AdminProductsModule,
    AdminSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
