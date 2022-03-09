/*
 * @Description: 元信息
 * @Author: sharebravery
 * @Date: 2022-03-09 10:01:09
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 10:03:25
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Chapter } from './chapter.entity';

@Entity()
export class AuditMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
