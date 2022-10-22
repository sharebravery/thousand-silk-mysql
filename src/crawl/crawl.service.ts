/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-10 09:33:30
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-11 16:20:09
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Chapter } from './chapter.entity';
import fs = require('fs');
import { delay, random } from 'src/utils';
import request = require('superagent');

import superagentProxy = require('superagent-proxy');
superagentProxy(request);

import charset = require('superagent-charset');
charset(request);

import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proxy } from 'src/proxy/proxy.entity';

@Injectable()
export class CrawlService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Chapter)
    private chaptersRepository: Repository<Chapter>,
    @InjectRepository(Proxy)
    private proxyRepository: Repository<Proxy>,
  ) {}

  private time = 0;

  proxy = null;

  timer = null;

  timeoutNumber = 0;

  /**
   *获取html页面
   *
   * @param {string} requestUrl
   * @param {string} [requestType]
   * @return {*}  {Promise<any>}
   * @memberof CrawlController
   */
  async GetHtml(requestUrl: string): Promise<any> {
    // const ms = random(500, 2100);
    // await delay(ms); // 控制爬虫速度

    // if (this.timer) clearInterval(this.timer);

    // if (this.time === 0) {
    //   let randomIps: Proxy[] = await this.proxyRepository.find();
    //   // let randomIps: Proxy[] = await this.proxyRepository.query(
    //   //   'SELECT * FROM proxy ORDER BY  RAND() LIMIT 100;',
    //   // );

    //   // randomIps = randomIps.filter(
    //   //   (o) => o.speed < 500 && o.protocols.includes('http'),
    //   // );
    //   randomIps = randomIps.filter((o) => o.country === 'CN');
    //   this.proxy = `${randomIps[0].protocols[0]}://${randomIps[0].ip}:${randomIps[0].port}`;
    // }

    // this.timer = setInterval(() => {
    //   this.time++;
    //   if (this.time === 1000 * 60 * 30) this.time = 0;
    // }, 1000);

    this.proxy = `http://124.204.33.162:8000`;
    console.log(
      '%c [     this.proxy ]-83',
      'font-size:13px; background:pink; color:#bf2c9f;',
      this.proxy,
    );

    return new Promise(async (resolve, reject) => {
      try {
        const result = await (request('GET', requestUrl) as any)
          .charset('gb2312')
          .proxy(this.proxy)
          .set('Referer', 'https://b.faloo.com/')
          .buffer(true)
          .set(
            'User-Agent',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
          )
          .timeout({
            response: 50000, // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
          });

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
