/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:31:11
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 16:54:28
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuditMetadata } from 'src/entitys/auditMetadata.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Book extends AuditMetadata {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  name: string;

  @ApiProperty({ name: '书籍地址' })
  @Column()
  url: string;

  @ApiProperty({ name: '简介' })
  @Column()
  introduction: string;

  @ApiProperty({ name: '简介分段存储' })
  introductionItems: Array<string> = [];

  @ApiProperty({ name: '章节目录' })
  chaptersDirectoryList: Array<Directory> = [];

  @ApiProperty({ name: '作者' })
  @Column()
  author: string;

  @OneToMany((type) => Chapter, (chapter) => chapter)
  chapters: Chapter[];
}

export class Directory {
  title: string;

  url: string;
}
