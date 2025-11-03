import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from 'src/modules/user/interfaces/user-service.interface';
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { User } from 'src/Enities/user.entity';
import { PaginationMeta } from 'src/classes/pagination-meta';
import { paginate, PaginationResult } from 'src/classes/pagination-response.class';
import { ResUserDTO } from './dto/res-user.dto';
import { ReqUser } from './dto/req-user.dto';
import { ApiErrorException } from 'src/exceptions/api-reponse.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        protected readonly userRepository: Repository<User>
    ) { }
    async getAllUser(query: PaginationMeta): Promise<PaginationResult<ResUserDTO> | null> {
        const where: FindOptionsWhere<User> = {};
        const order: FindOptionsOrder<User> = { id: 'DESC', };
        const result = await paginate(this.userRepository, where, query, {
            order,
            relations: {
                role: true
            }
        })
        return result
    }
    async getUserById(dto: ReqUser.findById): Promise<ResUserDTO | null> {
        const result = await this.userRepository.findOne({
            where: { id: dto.id },
            relations: { role: true }
        });
        if (!result) {
            throw new ApiErrorException(
                'User NotFound',
                HttpStatus.NOT_FOUND
            )
        }
        return result
    }
    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: { role: true }
        });
        return user || null; // không ném lỗi
    }
    async getUserByEmail(dto: ReqUser.findByEmail): Promise<ResUserDTO | null> {
        const result = await this.userRepository.findOne({
            where: { email: dto.email },
            relations: { role: true }
        })
        if (!result) {
            throw new ApiErrorException('Not Found')
        }
        return result
    }
    async createUser(dto: ReqUser.createUser): Promise<ResUserDTO | null> {
        const exits = await this.userRepository.findOneBy({ email: dto.email })
        if (exits) {
            throw new ApiErrorException(
                'User CONFLICT',
                HttpStatus.CONFLICT
            )
        }
        if (!dto.roleId) {
        dto.roleId = 1; // default roleId
    }
        const newUser = this.userRepository.create(dto);
        const saved = await this.userRepository.save(newUser);

        if (!saved) {
            throw new ApiErrorException(
                'User BAD_REQUEST',
                HttpStatus.BAD_REQUEST
            )
        }
        return saved;

    }
    async updateUser(
        dto: ReqUser.updateUser,
        data: DeepPartial<User>,
        roleId?: number): Promise<ResUserDTO | null> {
        const user = await this.userRepository.findOne({
            where: { id: dto.id },
            relations: { role: true }
        });
        if (!user) {
            throw new ApiErrorException(
                'User NotFound',
                HttpStatus.NOT_FOUND
            )
        }
        if (roleId) {
            user.roleId = roleId;
        }
        const updated = await this.userRepository.save(
            this.userRepository.merge(user, data)
        )
        if (!updated) {
            throw new ApiErrorException(
                'User cant update',
                HttpStatus.BAD_REQUEST
            )
        }
        return updated as User
    }
    async deleteUser(dto: ReqUser.deleteUser): Promise<void> {
        const result = await this.userRepository.delete(dto.id)
        if (!result) {
            throw new ApiErrorException(
                'User NotFound',
                HttpStatus.NOT_FOUND
            )
        }
    }
}
