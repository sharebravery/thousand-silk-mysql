/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 08:47:38
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-12 22:39:02
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
import { delay, random } from 'src/utils';
import { CrawlService } from './crawl.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const REQUEST_BASEURL = 'https://b.faloo.com/'; // 抓取基本地址

const WRITE_BASEURL = './src/database/'; // 写入文件基本路径

const BOOK_URL_LIST: Array<string> = [
  'https://b.faloo.com/1110752.html',
  'https://b.faloo.com/1088980.html',
  'https://b.faloo.com/1113154.html',
];

@Controller('Crawl')
@ApiTags('CrawlController')
export class CrawlController {
  constructor(
    private readonly crawlService: CrawlService,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // TODO:  引入IP池
  // TODO:  控制并发
  // TODO:  爬虫伪装
  // TODO:  断点续传
  // TODO:  自动抓取书籍列表
  // TODO:  外部接口

  /**
   *启动爬虫
   *
   * @param {*} chapter
   * @param {*} callback
   * @memberof CrawlController
   */
  @ApiOperation({
    summary: '启动爬虫',
  })
  @Get('startCrawlBook')
  async startCrawlBook() {
    try {
      console.log('[ 开始抓取 ]-54');

      const books = await this.CrawlBook(BOOK_URL_LIST); // 书籍基本信息

      for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // 写入书名
        await fs.writeFileSync(
          WRITE_BASEURL + `${book.name}.txt`,
          book.name + '\r\r\n',
        );

        const chapters = await this.analyticalChapterContent(book);

        book.chapters = chapters;

        book.chaptersJson = JSON.stringify(chapters);
        book.introductionItemsJson = JSON.stringify(book.introductionItems);
        book.chaptersDirectoryJson = JSON.stringify(book.chaptersDirectoryList);
        await this.crawlService.SaveBookAsync(book); // 保存书籍进入数据库
      }

      // this.writeAllFileSync(books); // 一并写入
      console.log('[ 爬虫运行完毕 ]-76');

      return books;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  /**
   *并发控制
   * @param {Array<string>} bookList
   * @return {*}
   * @memberof CrawlController
   */
  async CrawlBook(bookList: Array<string>): Promise<Book[]> {
    console.log('[ 开始抓取目录 ]-92');
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
   * 获取书籍基本信息、抓取目录
   * @param url
   * @param callback
   * @returns
   */
  async CrawlBookBaseInfo(url: string, callback?): Promise<Book> {
    const book = new Book();

    return new Promise(async (resolve, reject) => {
      try {
        const html = await this.crawlService.GetHtml(url);

        const $ = cheerio.load(html); // 装载页面

        // 书名
        const name = $('#novelName').text();
        book.name = name;

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
          const directory = new Directory();

          const a = $(el).attr('title');

          const url = 'https:' + $(el).attr('href');

          directory.title = a;

          directory.url = url;
          if (a) book.chaptersDirectoryList.push(directory);
        });

        resolve(book);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   *解析存入章节内容
   *
   * @param {*} chapters
   * @return {*}
   * @memberof CrawlController
   */
  analyticalChapterContent(book: Book): Promise<Chapter[]> {
    console.log('[ 当前抓取书籍 ]-185', book.name);

    const { chaptersDirectoryList } = book;

    return new Promise(async (resolve, reject) => {
      const chapters: Chapter[] = [];
      try {
        const bookInfo = await this.booksRepository.findOne(book.url); // 查询书籍

        for (let i = 0; i < 3; i++) {
          // for (let i = 0; i < chaptersDirectoryList.length; i++) {
          const item = chaptersDirectoryList[i];

          if (
            bookInfo?.chaptersJson &&
            (JSON.parse(JSON.stringify(bookInfo.chaptersJson)) as Chapter[])
              .map((o) => o.url)
              .includes(item.url)
          ) {
            console.log(item.title, '-章节已存在');

            continue; // 如果数据库内存在 则跳过
          }

          const chapter = new Chapter();

          console.log(' [  正在抓取 ]-198', item.title);

          const html = await this.crawlService.GetHtml(item.url);

          const $ = cheerio.load(html); // 装载页面

          chapter.url = item.url;

          // 章节名称
          const name = $('#novelName').text();
          const title = $('.c_l_title h1').text().replace(name, '').trim();
          chapter.title = title;

          const content = $('.noveContent');
          chapter.content = content.text(); // 存入完整字符串内容

          // 存入段落数组
          content.find('p').each((i, el) => {
            const p = $(el).text();

            chapter.contents.push(p);
          });

          chapters.push(chapter);

          chapter.contentsJson = JSON.stringify(chapter.contents);
          await this.crawlService.SaveChapterAsync(chapter); // 保存章节进入数据库

          //写入章节
          await this.crawlService.SaveChapter(
            chapter,
            WRITE_BASEURL + `${book.name}.txt`,
          );
        }

        resolve(chapters);
      } catch (error) {
        reject(error);
      }
    });
  }
}
