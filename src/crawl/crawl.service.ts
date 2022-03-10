/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-10 09:33:30
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 14:56:20
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Chapter } from './chapter.entity';
import fs = require('fs');
import { delay, random } from 'src/utils';
import request = require('superagent');
import charset = require('superagent-charset');
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CrawlService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
  ) {}

  /**
   *获取html页面
   *
   * @param {string} requestUrl
   * @param {string} [requestType]
   * @return {*}  {Promise<any>}
   * @memberof CrawlController
   */
  async GetHtml(requestUrl: string, requestType?: string): Promise<any> {
    const ms = random(500, 2100);
    // await delay(ms); // 控制爬虫速度

    return new Promise(async (resolve, reject) => {
      try {
        const result = await (request(requestType ?? 'GET', requestUrl) as any)
          .charset('gb2312')
          .set('Referer', 'https://b.faloo.com/')
          .set(
            'User-Agent',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
          )
          .buffer(true);
        resolve(result.text);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   *保存书籍
   *
   * @param {Book} book
   * @memberof CrawlService
   */
  async SaveBookAsync(book: Book) {
    // console.log('正在保存书籍');
    return await this.booksRepository.save(book);
  }

  async SaveChapterAsync(chapter: Chapter) {
    // console.log('正在保存章节');
    return await this.chaptersRepository.save(chapter);
  }

  /**
   *保存章节内容
   *
   * @param {Chapter} chapter
   * @param {string} [writeUrl]
   * @memberof CrawlService
   */
  async SaveChapter(chapter: Chapter, writeUrl?: string) {
    await fs.appendFile(
      writeUrl,
      chapter.title + '\r\n' + chapter.content,
      () => {
        // console.log('写入章节:' + chapter.title);
      },
    );
  }

  /**
   *写入所有书籍
   *
   * @param {Book[]} books
   * @memberof CrawlController
   */
  async writeAllFileSync(books: Book[], writeUrl?: string) {
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      await fs.writeFileSync(writeUrl, book.name + '\r\r\n'); // 写入书名

      for (let j = 0; j < book.chapters.length; j++) {
        const chapter = book.chapters[j];
        await fs.appendFile(
          writeUrl,
          chapter.title + '\r\n' + chapter.content,
          () => {
            // console.log('写入章节:' + chapter.title);
          },
        );
      }
    }

    console.log('写入完成');
  }

  /**
   *写入单本书籍
   *
   * @param {*} book
   * @memberof CrawlController
   */
  async writeSingleFileSync(book: Book, i, writeUrl?: string) {
    if (i === 1) {
      await fs.writeFileSync(writeUrl, book.name + '\r\r\n'); // 写入书名
    }

    for (let j = 0; j < book.chapters.length; j++) {
      const chapter = book.chapters[j];
      await fs.appendFile(
        writeUrl,
        chapter.title + '\r\n' + chapter.content,
        () => {
          console.log('写入章节:' + chapter.title);
        },
      );
    }
  }
}
