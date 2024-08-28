import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { DeliveryOptionController } from './delivery-option.controller';
import { DeliveryOptionService } from './delivery-option.service';

@Module({
  controllers: [DeliveryOptionController],
  providers: [DeliveryOptionService, PrismaService],
})
export class DeliveryOptionModule {}
