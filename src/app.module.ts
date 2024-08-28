import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { DeliveryOptionModule } from './delivery-option/delivery-option.module';
import { TaxModule } from './tax/tax.module';
import { LicenseModule } from './license/license.module';
import { ProductModule } from './product/product.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ContactModule,
    DeliveryOptionModule,
    TaxModule,
    LicenseModule,
    ProductModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
