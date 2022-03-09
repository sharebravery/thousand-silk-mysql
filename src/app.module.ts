import { CrawlModule } from './crawl/crawl.module';
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-08 09:52:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 10:05:07
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FalooModule } from './faloo/faloo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditMetadata } from './entitys/auditMetadata.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([AuditMetadata]),
    CrawlModule,
    FalooModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
