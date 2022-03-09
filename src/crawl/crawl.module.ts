/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 08:47:20
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 08:47:39
 */
import { CrawlController } from './crawl.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CrawlController],
  providers: [],
})
export class CrawlModule {}
