/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:48:19
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 11:08:49
 */
import { ApiProperty } from '@nestjs/swagger';
import { AuditMetadata } from 'src/entitys/auditMetadata.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Chapter extends AuditMetadata {
  @ApiProperty({ description: '章节标题' })
  @Column()
  title: string;

  @ApiProperty({ description: '章节地址' })
  @Column()
  url: string;

  @ApiProperty({ description: '章节内容' })
  @Column('text')
  content: string;

  //   @Column({ array: true, default: [] })
  @ApiProperty({ description: '章节内容分段存储' })
  contents: Array<string> = [];

  @Column({ type: 'text', nullable: true })
  html: string;

  @Column()
  date: Date;
}
