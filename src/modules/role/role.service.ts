import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/Enities/role.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { IRoleService } from './interfaces/role-service.interface';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { paginate, PaginationResult } from 'src/classes/pagination-response.class';
import { ResRoleDTO } from './dto/res-role.dto';
import { ReqRoleDTO } from './dto/req-role.dto';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';

@Injectable()
export class RoleService implements IRoleService {
    constructor(
        @InjectRepository(Role)
        protected readonly roleRepository: Repository<Role>
    ) { }
    async getAllRole(query: PaginationMeta): Promise<PaginationResult<ResRoleDTO | null>> {
        const where: FindOptionsWhere<Role> = {};
        const order: FindOptionsOrder<Role> = { id: 'DESC' };
        const result = await paginate(this.roleRepository, where, query, {
            order,
        })
        return result
    }
    async getByIdRole(dto: ReqRoleDTO.findById): Promise<ResRoleDTO | null> {
        const result = await this.roleRepository.findOne({
            where: { id: dto.id }

        })
        return result
    }
    async createRole(dto: ReqRoleDTO.createRole): Promise<ResRoleDTO | null> {
        const exits = await this.roleRepository.findOneBy({ name: dto.name })
        if (exits) {
            throw new ApiErrorException('Role already exits', HttpStatus.CONFLICT)
        }
        const saved = await this.roleRepository.save(dto)
        if (!saved) {
            throw new ApiErrorException('Role cant save', HttpStatus.BAD_REQUEST)
        }
        return saved
    }
    async updateRole(dto: ReqRoleDTO.updateRole, data: Partial<Role>): Promise<ResRoleDTO | null> {
        const exits = await this.getByIdRole({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Role not found', HttpStatus.NOT_FOUND)
        }
        const updated = await this.roleRepository.save(
            this.roleRepository.merge(exits, data)
        )
        if (!updated) {
            throw new ApiErrorException('Role update failed', HttpStatus.BAD_REQUEST)
        }
        return updated
    }
    async removeRole(dto: ReqRoleDTO.removeRole): Promise<void> {
        const exits = await this.getByIdRole({ id: dto.id })
        if (!exits) {
            throw new ApiErrorException('Role Not found', HttpStatus.NOT_FOUND)
        }
        const removed = await this.roleRepository.delete(dto.id)
        if (!removed) {
            throw new ApiErrorException('Role remove failed', HttpStatus.BAD_REQUEST)
        }
    }
}
