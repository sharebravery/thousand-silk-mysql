/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:31:11
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 11:18:23
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuditMetadata } from 'src/entitys/auditMetadata.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity()
export class Book extends AuditMetadata {
  // @PrimaryGeneratedColumn()
  // id: number;

  @ApiProperty({ description: '书名' })
  @Column()
  name: string;

  @ApiProperty({ description: '书籍地址' })
  @Column()
  url: string;

  @ApiProperty({ description: '简介' })
  @Column('text')
  introduction: string;

  @ApiProperty({ description: '简介分段存储' })
  introductionItems: Array<string> = [];

  @ApiProperty({ description: '章节目录' })
  chaptersDirectoryList: Array<Directory> = [];

  @ApiProperty({ description: '章节存储Json格式' })
  @Column('json')
  chaptersDirectoryJson: string;

  @ApiProperty({ description: '作者' })
  @Column({ nullable: true })
  author: string;

  @ApiProperty({ description: '章节信息' })
  @OneToMany((type) => Chapter, (chapter) => chapter)
  chapters: Chapter[];
}

export class Directory {
  title: string;

  url: string;
}
