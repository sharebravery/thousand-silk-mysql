/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 08:47:38
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 18:06:25
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import cheerio = require('cheerio');
import request = require('superagent');
import charset = require('superagent-charset');
import path = require('path');
import fs = require('fs');
import { Book, Directory } from './book.entity';

import async = require('async');
import { Chapter } from './chapter.entity';
import { delay } from 'src/utils';

const REQUEST_BASEURL = 'https://b.faloo.com/'; // 抓取基本地址

const BOOK_URL_LIST: Array<string> = [
  'https://b.faloo.com/1110752.html',
  'https://b.faloo.com/1088980.html',
];

@Controller('Crawl')
@ApiTags('CrawlController')
export class CrawlController {
  /**
   *启动爬虫
   * @return {*}
   * @memberof CrawlController
   */
  @Get('startCrawlBook')
  async startCrawlBook(): Promise<Book[]> {
    console.log('[ 开始抓取 ]-136');
    return await this.CrawlBook(BOOK_URL_LIST);
  }

  /**
   *并发控制
   * @param {Array<string>} bookList
   * @return {*}
   * @memberof CrawlController
   */
  // @Get('CrawlBook')
  async CrawlBook(bookList: Array<string>): Promise<Book[]> {
    return new Promise(async (resolve, reject) => {
      const data = [];
      try {
        for (let i = 0; i < bookList.length; i++) {
          const url = bookList[i];
          const book = await this.CrawlBookBaseInfo(url);
          book.url = url;

          data.push(book);
        }
        resolve(data);

        // async.mapLimit(
        //   bookList,
        //   1,
        //   async (url, callback) => {
        //     const book = await this.CrawlBookBaseInfo(url, callback);
        //     book.url = url;
        //     return book;
        //   },
        //   (err, results) => {
        //     resolve(results);
        //   },
        // );
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *获取html页面
   * @param {string} requestUrl
   * @param {string} [requestType]
   * @return {*}  {Promise<any>}
   * @memberof CrawlController
   */
  async GetHtml(requestUrl: string, requestType?: string): Promise<any> {
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
   * 获取书籍基本信息、抓取目录
   * @param url
   * @param callback
   * @returns
   */
  async CrawlBookBaseInfo(url: string, callback?): Promise<Book> {
    const book = new Book();

    return new Promise(async (resolve, reject) => {
      try {
        const html = await this.GetHtml(url);

        const $ = cheerio.load(html); // 装载页面

        // 书名
        const name = $('#novelName').text();
        book.name = name;
        // console.log('[ 当前抓取书名 ]-68', book.name);

        // 简介
        const introduction = $('.C-Two p');
        book.introduction = introduction
          .text()
          .replace(new RegExp('飞卢小说网', 'g'), '');

        introduction.each((i, el) => {
          const p = $(el).text();
          if (!p.includes('飞卢小说网')) {
            book.introductionItems.push(p);
          }
        });

        //章节目录
        const directory = $('.C-Fo-Zuo a');

        directory.each((i, el) => {
          if (i > 1) {
            const directory = new Directory();

            const a = $(el).attr('title');

            const url = 'https:' + $(el).attr('href');

            directory.title = a;

            directory.url = url;
            if (a) book.chaptersDirectoryList.push(directory);
          }
        });

        resolve(book);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *根据书籍目录抓取章节内容
   *
   * @param {*} chapter
   * @param {*} callback
   * @memberof CrawlController
   */
  @ApiOperation({
    description: '抓取章节内容',
  })
  @Get('CrawChapterDirectory')
  async CrawChapterDirectory(chapters, callback) {
    const books = await this.startCrawlBook();

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const chapters = await this.analyticalChapterContent(
        book.chaptersDirectoryList,
      );
      book.chapters = chapters;
    }

    return books;
  }

  /**
   *解析存入章节内容
   *
   * @param {*} chapters
   * @return {*}
   * @memberof CrawlController
   */
  analyticalChapterContent(list: Directory[]): Promise<Chapter[]> {
    return new Promise(async (resolve, reject) => {
      const chapters: Chapter[] = [];
      try {
        for (let i = 0; i < 3; i++) {
          const item = list[i];

          const chapter = new Chapter();

          const html = await this.GetHtml(item.url);

          const $ = cheerio.load(html); // 装载页面

          // 章节名称
          const name = $('#novelName').text();
          const title = $('.c_l_title h1').text().replace(name, '').trim();
          chapter.title = title;
          console.log(' [  正在抓取 ]-216', title);

          const content = $('.noveContent');
          chapter.content = content.text(); // 存入完整字符串内容

          // 存入段落数组
          content.find('p').each((i, el) => {
            const p = $(el).text();

            chapter.contents.push(p);
          });

          chapters.push(chapter);

          delay(5000);
        }

        resolve(chapters);
      } catch (error) {
        reject(error);
      }
    });
  }

  // writeFileSync(books) {
  //   console.log(
  //     '%c [ books ]-241',
  //     'font-size:13px; background:pink; color:#bf2c9f;',
  //     books,
  //   );
  // }
}
