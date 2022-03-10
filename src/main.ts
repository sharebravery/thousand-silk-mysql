/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-08 09:52:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 09:46:02
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CrawlController } from './crawl/crawl.controller';

// const crawlController = new CrawlController();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('千丝')
    .setDescription('爬虫')
    .setVersion('1.0')
    .addTag('千丝')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('[ TARGET ]   ' + 'http://localhost:3000/api');
  await app.listen(3000);

  // crawlController.startCrawlBook();
}
bootstrap();
