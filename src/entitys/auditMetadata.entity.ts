import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-09 20:05:43
 * @LastEditors: sharebravery
 * @LastEditTime: 2022-03-09 20:06:48
 */
@Entity()
export class AuditMetadata {
  @PrimaryGeneratedColumn()
  id: number;
}
