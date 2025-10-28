import { PaginationMeta } from "src/classes/pagination-meta";
import { PaginationResult } from "src/classes/pagination-response.class";
import { ResMaterial } from "../dto/res-material.dto";
import { ReqMaterial } from "../dto/req-material.dto";
import { DeepPartial } from "typeorm";
import { Material } from "src/Enities/material.entity";

export interface IMaterial {
    getAll(query: PaginationMeta): Promise<PaginationResult<ResMaterial>>
    getById(dto: ReqMaterial.GetById): Promise<ResMaterial>
    create(dto: ReqMaterial.Create): Promise<ResMaterial>
    update(dto: ReqMaterial.GetById, data: DeepPartial<Material>): Promise<ResMaterial>
    remove(dto: ReqMaterial.Delete): Promise<void>
}