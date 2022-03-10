/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-08 09:52:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 15:52:47
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
