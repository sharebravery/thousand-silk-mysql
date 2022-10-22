/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-14 15:58:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-03 15:51:10
 */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ProxyService } from './proxy.service';

// const REQUEST_URL_LIST = ['https://ip.jiangxianli.com/'];

@ApiTags('ProxyController')
@Controller('Proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({
    summary: '抓取代理进入IP池',
  })
  @Get('GetProxyList')
  GetProxyList() {
    return this.proxyService.GetProxyList();
  }

  @ApiOperation({
    summary: '校验代理',
  })
  @Get('CheckProxy')
  async CheckProxy() {
    return await this.proxyService.CheckProxy();
  }
}
