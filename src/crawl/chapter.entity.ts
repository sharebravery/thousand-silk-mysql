/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:48:19
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-12 22:22:58
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
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Chapter extends AuditMetadata {
  @ApiProperty({ description: '章节地址' })
  @PrimaryColumn()
  url: string;

  @ApiProperty({ description: '章节标题' })
  @Column()
  title: string;

  @ApiProperty({ description: '章节内容' })
  @Column('text')
  content: string;

  contents: Array<string> = []; // 章节内容分段存储

  @ApiProperty({ description: '章节内容分段存储Json格式' })
  @Column('json')
  contentsJson: string;

  @Column({ type: 'text', nullable: true })
  html: string;
}
