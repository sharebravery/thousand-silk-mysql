import { CrawlModule } from './crawl/crawl.module';
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-08 09:52:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 08:52:57
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FalooModule } from './faloo/faloo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), CrawlModule, FalooModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
