import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { LicenseController } from './license.controller';
import { LicenseService } from './license.service';

@Module({
  controllers: [LicenseController],
  providers: [LicenseService, PrismaService],
})
export class LicenseModule {}
