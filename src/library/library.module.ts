/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-11 16:22:33
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-11 16:44:07
 */
import { LibraryController } from './library.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/crawl/book.entity';
import { Chapter } from 'src/crawl/chapter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Chapter])],
  controllers: [LibraryController],
  providers: [],
})
export class LibraryModule {}
