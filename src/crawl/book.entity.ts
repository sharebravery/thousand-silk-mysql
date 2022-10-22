/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:31:11
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-12 22:34:06
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuditMetadata } from 'src/entitys/auditMetadata.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Book extends AuditMetadata {
  @ApiProperty({ description: '书名' })
  @Column()
  name: string;

  @ApiProperty({ description: '书籍地址' })
  @PrimaryColumn()
  url: string;

  @ApiProperty({ description: '简介' })
  @Column('text')
  introduction: string;

  introductionItems: Array<string> = []; // 简介分段存储

  @ApiProperty({ description: '简介分段存储Json格式' })
  @Column('json')
  introductionItemsJson: string;

  chaptersDirectoryList: Array<Directory> = []; // 章节目录

  @ApiProperty({ description: '章节目录存储Json格式' })
  @Column('json')
  chaptersDirectoryJson: string;

  @ApiProperty({ description: '作者' })
  @Column({ nullable: true })
  author: string;

  // @ApiProperty({ description: '章节信息' })
  // @OneToMany((type) => Chapter, (chapter) => chapter)
  chapters: Chapter[];

  @ApiProperty({ description: '章节信息存储Json格式' })
  @Column('json')
  chaptersJson: string;
}

export class Directory {
  title: string;

  url: string;
}
