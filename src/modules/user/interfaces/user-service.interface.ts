import { PaginationMeta } from "src/classes/pagination-meta";
import { PaginationResult } from "src/classes/pagination-response.class";
import { ResUserDTO } from "../dto/res-user.dto";
import { ReqUserDTO } from "../dto/req-resign-user.dto";
import { ReqUser } from "../dto/req-user.dto";
import { DeepPartial } from "typeorm";
import { User } from "src/Enities/user.entity";

export interface IUserService {
    getAllUser(query: PaginationMeta): Promise<PaginationResult<ResUserDTO> | null>;
    getUserById(dto: ReqUser.findById): Promise<ResUserDTO | null>;
    getUserByEmail(dto: ReqUser.findByEmail): Promise<ResUserDTO | null>;
    // CRUD
    createUser(dto: ReqUser.createUser): Promise<ResUserDTO | null>;
    updateUser(
        dto: ReqUser.updateUser,
        data: DeepPartial<User>,
        roleId?: number): Promise<ResUserDTO | null>;
    deleteUser(dto: ReqUser.deleteUser): Promise<void>;
}