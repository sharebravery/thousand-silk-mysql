/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-11 16:22:44
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-12 22:01:09
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Book } from 'src/crawl/book.entity';
import { Chapter } from 'src/crawl/chapter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { delay } from 'src/utils';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';

@ApiTags('LibraryController')
@Controller('Library')
export class LibraryController {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
  ) {}

  @ApiOperation({
    summary: '查找书籍',
  })
  @ApiQuery({ name: 'url', required: true })
  @Get('FindBookByUrlAsync')
  FindBookByUrlAsync(@Query() url: string): Promise<Book> {
    return new Promise<Book>(async (resolve, reject) => {
      try {
        const result = await this.booksRepository.findOne(url);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  //   FindChapterByUrlAsync(url): Promise<Chapter> {
  //     return new Promise<Chapter>((resolve, reject) => {
  //       try {
  //         const chapter = new Chapter();
  //       } catch (error) {
  //         reject(error);
  //       }
  //     });
  //   }
  //   FindBookByUrl(): Promise<Book> {
  //     return null;
  //   }
}
