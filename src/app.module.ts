import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
