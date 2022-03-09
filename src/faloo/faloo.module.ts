/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-07 17:31:08
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-07 17:56:12
 */
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FalooController } from './faloo.controller';
import { FalooService } from './faloo.service';

@Module({
  imports: [],
  controllers: [FalooController],
  providers: [FalooService],
})
export class FalooModule {}
