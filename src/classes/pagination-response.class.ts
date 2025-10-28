import { PaginationQuery } from 'src/classes/pagination-query.class';
import {
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsWhere,
    ObjectLiteral,
    Repository,
} from 'typeorm';

export interface PaginationResult<T> {
    result: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export async function paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    query: PaginationQuery,
    options?: {
        order?: FindOptionsOrder<T>;
        relations?: FindOptionsRelations<T>;
    },
): Promise<PaginationResult<T>> {
    const currentPage = query.page || 1;
    const currentLimit = query.limit || 10;
    const skip = (currentPage - 1) * currentLimit;

    const [items, total] = await repository.findAndCount({
        where,
        skip,
        take: currentLimit,
        ...options,
    });

    return {
        result: items,
        meta: {
            page: currentPage,
            limit: currentLimit,
            total,
            totalPages: Math.ceil(total / currentLimit),
        },
    };
}