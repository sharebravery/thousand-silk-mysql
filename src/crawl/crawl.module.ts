/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 08:47:20
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 09:49:08
 */
import { CrawlController } from './crawl.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Chapter } from './chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Chapter])],
  controllers: [CrawlController],
  providers: [],
})
export class CrawlModule {}
