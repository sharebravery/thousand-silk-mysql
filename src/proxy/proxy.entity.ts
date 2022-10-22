import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AuditMetadata } from '../entitys/auditMetadata.entity';

@Entity()
export class Proxy extends AuditMetadata {
  @ApiProperty({ description: 'IP地址' })
  @PrimaryColumn()
  ip: string;

  @ApiProperty({ description: '端口' })
  @Column()
  port: string;

  // @ApiProperty({ description: '代理位置' })
  // @Column()
  // location: string;

  @ApiProperty({ description: 'country' })
  @Column()
  country: string;

  @ApiProperty({ description: 'city' })
  @Column()
  city: string;

  @ApiProperty({ description: 'isp' })
  @Column()
  isp: string;

  @ApiProperty({ description: '最后检查时间' })
  @Column()
  lastChecked: number;

  @ApiProperty({ description: '速度', nullable: true })
  @Column()
  speed: number;

  @ApiProperty({ description: '匿名等级' })
  @Column()
  anonymityLevel: string;

  @ApiProperty({ description: '匿名协议' })
  @Column({ type: 'json', nullable: true })
  protocols: string;

  @ApiProperty({ description: 'http | https', nullable: true })
  @Column({ nullable: true })
  type: ProxyType;

  @ApiProperty({ description: '是否可用' })
  @Column({ nullable: true })
  available: boolean;
}

export enum ProxyType {
  http,
  https,
}
