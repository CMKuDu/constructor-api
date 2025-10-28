import { PaginationMeta } from "src/classes/pagination-meta";
import { PaginationResult } from "src/classes/pagination-response.class";
import { ResRoleDTO } from "../dto/res-role.dto";
import { ReqRoleDTO } from "../dto/req-role.dto";
import { Role } from "src/Enities/role.entity";

export interface IRoleService {
    getAllRole(query: PaginationMeta): Promise<PaginationResult<ResRoleDTO | null>>
    getByIdRole(dto: ReqRoleDTO.findById): Promise<ResRoleDTO | null>
    createRole(dto: ReqRoleDTO.createRole): Promise<ResRoleDTO | null>
    updateRole(dto: ReqRoleDTO.updateRole,
        data: Partial<Role>
    ): Promise<ResRoleDTO | null>
    removeRole(dto: ReqRoleDTO.removeRole): Promise<void>
}