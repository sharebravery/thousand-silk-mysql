import {
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 20:05:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-10 15:22:19
 */
// @Entity()
export class AuditMetadata {
  // @PrimaryGeneratedColumn()
  // id: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
