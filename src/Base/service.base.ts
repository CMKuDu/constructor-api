import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQuery } from 'src/classes/pagination-query.class';
import {
    paginate,
    PaginationResult,
} from 'src/classes/pagination-response.class';
import {
    DeepPartial,
    FindManyOptions,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsWhere,
    Repository,
} from 'typeorm';
import { BaseEntity } from './entity.base';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
    protected readonly repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async first(options?: FindManyOptions<T>) {
        const result = await this.repository.find(options);
        return result[0];
    }

    /**
     * Tìm tất cả bản ghi
     */
    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    /**
     * Tìm bản ghi theo điều kiện phân trang
     */
    async findWithPagination(
        where: FindOptionsWhere<T>,
        query: PaginationQuery,
        options?: {
            order?: FindOptionsOrder<T>;
            relations?: FindOptionsRelations<T>;
        },
    ): Promise<PaginationResult<T>> {
        return await paginate(this.repository, where, query, options);
    }

    /**
     * Tìm một bản ghi theo ID
     */
    async findOne(
        id: number,
        options?: {
            relations?: FindOptionsRelations<T>;
        },
    ): Promise<T | null> {
        return await this.repository.findOne({
            where: { id } as FindOptionsWhere<T>,
            ...options,
        });
    }

    /**
     * Tìm một bản ghi theo ID, throw exception nếu không tìm thấy
     */
    async findOneOrThrow(
        id: number,
        options?: {
            relations?: FindOptionsRelations<T>;
        },
    ): Promise<T> {
        const entity = await this.findOne(id, options);
        if (!entity) {
            throw new NotFoundException(`Entity with ID ${id} not found`);
        }
        return entity;
    }

    /**
     * Tìm một bản ghi theo điều kiện
     */
    async findBy(where: FindOptionsWhere<T>): Promise<T[]> {
        return await this.repository.findBy(where);
    }

    /**
     * Tìm một bản ghi duy nhất theo điều kiện
     */
    async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
        return await this.repository.findOneBy(where);
    }

    /**
     * Tạo mới một bản ghi
     */
    async create(createData: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(createData);
        return await this.repository.save(entity);
    }

    /**
     * Cập nhật một bản ghi theo ID
     */
    async update(id: number, updateData: DeepPartial<T>): Promise<T> {
        const entity = await this.findOneOrThrow(id);
        this.repository.merge(entity, updateData);
        return await this.repository.save(entity);
    }

    /**
     * Xóa một bản ghi theo ID
     */
    async remove(id: number): Promise<void> {
        const entity = await this.findOneOrThrow(id);
        await this.repository.remove(entity);
    }

    /**
     * Xóa mềm một bản ghi theo ID (nếu entity hỗ trợ soft delete)
     */
    async softRemove(id: number): Promise<void> {
        const entity = await this.findOneOrThrow(id);
        await this.repository.softRemove(entity);
    }

    /**
     * Đếm số lượng bản ghi
     */
    async count(options?: FindManyOptions<T>): Promise<number> {
        return await this.repository.count(options);
    }

    /**
     * Kiểm tra bản ghi có tồn tại hay không
     */
    async exists(where: FindOptionsWhere<T>): Promise<boolean> {
        const count = await this.repository.count({ where });
        return count > 0;
    }

    /**
     * Tạo nhiều bản ghi
     */
    async createMany(createDataArray: DeepPartial<T>[]): Promise<T[]> {
        const entities = this.repository.create(createDataArray);
        return await this.repository.save(entities);
    }

    /**
     * Lấy repository để thực hiện các query phức tạp
     */
    getRepository(): Repository<T> {
        return this.repository;
    }

    /**
     * Tạo query builder
     */
    createQueryBuilder(alias?: string) {
        return this.repository.createQueryBuilder(alias);
    }
}