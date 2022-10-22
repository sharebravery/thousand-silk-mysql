import {
  Repository,
  DeleteResult,
  SaveOptions,
  FindConditions,
  RemoveOptions,
  DeepPartial,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * 服务基类
 */
// @Injectable()
export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  saveOne<TS extends DeepPartial<T>>(
    entities: TS,
    options?: SaveOptions,
  ): Promise<TS> {
    return this.repository.save(entities, options);
  }

  async saveMany<TS extends DeepPartial<T>>(
    entities: TS[],
    options?: SaveOptions,
  ): Promise<TS[]> {
    return this.repository.save(entities, options);
  }

  async findOne(options?: FindConditions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async findMany(options?: FindConditions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
    return this.repository.remove(entities, options);
  }

  async delete(options?: FindConditions<T>): Promise<DeleteResult> {
    return this.repository.delete(options);
  }

  async update(
    conditions: number | FindConditions<T>,
    newValue: QueryDeepPartialEntity<T>,
  ): Promise<number> {
    let updateResult = 1;
    await this.repository
      .update(conditions, newValue)
      .catch((e) => (updateResult = 0));
    return updateResult;
  }
}
