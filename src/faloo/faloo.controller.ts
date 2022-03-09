/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-07 15:38:37
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-08 19:58:24
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import cheerio = require('cheerio');
import { FalooService } from './faloo.service';
import request = require('superagent');
import charset = require('superagent-charset');
import path = require('path');
import fs = require('fs');

charset(request);

const REQUEST_BASEURL = 'https://b.faloo.com/1110752_1.html'; // 抓取基本地址

const WRITER_BASEURL = './src/database/'; // 写入文件基本路径

export class Book {
  id: number;
  name: string;
  author: string;
  chapterList: Chapter[] = [];
}

export class Chapter {
  id: string;
  title: string;
  content: string;
  contents: Array<string> = [];
  html: string;
  date: Date = new Date();
}

@Controller('Faloo')
@ApiTags('FalooController')
export class FalooController {
  constructor(private readonly falooService: FalooService) {}

  @ApiOperation({
    description: '获取faloo网页数据',
  })
  @Post('FetchFalooData')
  async FetchFalooData() {
    return new Promise(async (resolve, reject) => {
      try {
        const book = new Book();
        const { chapterList } = book;

        const chapter = new Chapter();

        const html = await this.falooService.GetHtml('GET', REQUEST_BASEURL);

        const $ = cheerio.load(html); // 装载页面

        const name = $('#novelName').text();
        book.name = name; // 书名

        const title = $('.c_l_title h1').text().replace(name, '').trim();
        chapter.title = title;

        const content = $('.noveContent');
        chapter.content = content.text(); // 存入完整字符串内容

        // 存入段落数组
        content.find('p').each((i, el) => {
          const p = $(el).text();
          chapter.contents.push(p);
        });

        chapterList.push(chapter);

        // fs.writeFileSync(
        //   WRITER_BASEURL + `${book.name}.txt`,
        //   book.name + '\r\r\n',
        // ); // 写入书名

        fs.appendFile(
          WRITER_BASEURL + `${book.name}.txt`,
          book.name + '\r\r\n',
          () => {
            console.log('写入书名');
          },
        );

        // 追加内容
        chapterList.forEach((item) => {
          // JSON.stringify(item.content.toString(), null, 2)

          fs.appendFile(
            WRITER_BASEURL + `${name}.txt`,
            item.title + '\r\n' + item.content,
            () => {
              console.log('追加内容完成');
            },
          );
        });

        resolve(html);
      } catch (error) {
        reject(error);
      }
    });
  }
}
