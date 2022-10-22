import { ProxyService } from './proxy.service';
import { ProxyController } from './proxy.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Proxy } from './proxy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proxy])],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
