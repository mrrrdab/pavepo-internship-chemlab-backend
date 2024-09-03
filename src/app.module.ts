import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxModule } from './tax/tax.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), TaxModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
