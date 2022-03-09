/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-07 17:30:29
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-08 10:07:55
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import cheerio = require('cheerio');
import request = require('superagent');
import superagent = require('superagent');
import charset = require('superagent-charset');
charset(request);

@Injectable()
export class FalooService {
  /**
   * 获取html页面
   * @returns
   */
  async GetHtml(requestType = 'GET', requestUrl: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await (request(requestType, requestUrl) as any)
          .charset('gb2312')
          .buffer(true);
        resolve(result.text);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   *解析数据
   * @memberof FalooService
   */
  async AnalyticalData(requestUrl) {
    // const $ = await cheerio.load(html);
  }
}
