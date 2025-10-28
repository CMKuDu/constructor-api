import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from 'src/Enities/material.entity';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { IMaterial } from './interface/material-service.interface';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { paginate, PaginationResult } from 'src/classes/pagination-response.class';
import { ResMaterial } from './dto/res-material.dto';
import { ReqMaterial } from './dto/req-material.dto';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';

@Injectable()
export class MaterialService implements IMaterial {
    constructor(
        @InjectRepository(Material)
        protected readonly materialRepository: Repository<Material>
    ) { }
    async getAll(query: PaginationMeta): Promise<PaginationResult<ResMaterial>> {
        const where: FindOptionsWhere<Material> = {}
        const order: FindOptionsOrder<Material> = { id: 'DESC' }
        const result = await paginate(this.materialRepository, where, query, {
            order,

        })
        return result
    }
    async getById(dto: ReqMaterial.GetById): Promise<ResMaterial> {
        const result = await this.materialRepository.findOne({
            where: { id: dto.id }
        })
        if (!result) {
            throw new ApiErrorException('Not found', HttpStatus.NOT_FOUND)
        }
        return result
    }
    async create(dto: ReqMaterial.Create): Promise<ResMaterial> {
        
        const exits = await this.materialRepository.findOneBy({ name: dto.name })
        if (exits) {
            throw new ApiErrorException('Already extis', HttpStatus.CONFLICT)
        }
        const saved = await this.materialRepository.save(dto)
        if (!saved) {
            throw new ApiErrorException("Cant't create material", HttpStatus.BAD_REQUEST)
        }
        return saved
    }
    async update(dto: ReqMaterial.GetById, data: DeepPartial<Material>): Promise<ResMaterial> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const updated = await this.materialRepository.save(
            this.materialRepository.merge(exits, data)
        )
        if (!updated) {
            throw new ApiErrorException("Cant't update material", HttpStatus.BAD_REQUEST)
        }
        return updated
    }
    async remove(dto: ReqMaterial.Delete): Promise<void> {
        const exits = await this.getById({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Not Found', HttpStatus.NOT_FOUND)
        }
        const remoed = await this.materialRepository.delete(dto.id)
        if (!remoed) {
            throw new ApiErrorException("Can't remove material", HttpStatus.BAD_REQUEST)
        }
    }
}
