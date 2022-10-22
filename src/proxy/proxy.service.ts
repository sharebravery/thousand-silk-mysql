/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-14 15:58:21
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-14 15:58:24
 */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/service/BaseService';
import { delay, random } from 'src/utils';

import request from 'src/utils/request';

// import request = require('superagent');

// import superagentProxy = require('superagent-proxy');
// superagentProxy(request);

// import charset = require('superagent-charset');
// charset(request);

import { Repository } from 'typeorm';

import { Proxy } from './proxy.entity';

@Injectable()
export class ProxyService extends BaseService<Proxy> {
  constructor(
    @InjectRepository(Proxy)
    private readonly proxyRepository: Repository<Proxy>,
  ) {
    super(proxyRepository);
  }

  async GetProxyList(): Promise<any> {
    // let ips: Proxy[] = [];
    // for (let i = 1; i <= 9; i++) {
    //   console.log(`正在抓取第${i}页`);
    //   const result = await this.CrawlHtmlForProxy(
    //     `https://proxylist.geonode.com/api/proxy-list?limit=200&page=${i}&sort_by=lastChecked&sort_type=desc&anonymityLevel=elite`,
    //   );
    //   ips = ips.concat(JSON.parse(result).data);
    //   await this.proxyRepository.save(ips);
    // }
    // console.log('保存成功');
    // return ips;
  }

  /**
   *校验代理
   *
   * @return {*}
   * @memberof ProxyService
   */
  async CheckProxy() {
    try {
      const proxy = 'http://124.204.33.162:8000';

      // const result = await (request as any)
      //   .get('http://bdaidu.com/')
      //   .proxy(proxy)
      //   .buffer(true)
      //   .set(
      //     'User-Agent',
      //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      //   );

      // request()

      const result = await request({
        url: 'http://icanhazip.com/',
        proxy,
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   *抓取html页面
   *
   * @param {string} requestUrl
   * @param {string} [requestType]
   * @return {*}  {Promise<any>}
   * @memberof CrawlController
   */
  async CrawlHtmlForProxy(requestUrl: string, proxy: string): Promise<any> {
    return request({
      url: requestUrl,
      proxy,
      callback: (html) => {
        console.log(
          '%c [ html ]-103',
          'font-size:13px; background:pink; color:#bf2c9f;',
          html,
        );
      },
    });
  }
}
