/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 09:48:19
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 17:54:59
 */
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
  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  content: string;

  //   @Column({ array: true, default: [] })
  contents: Array<string> = [];

  @Column()
  html: string;

  @Column()
  date: Date;
}
