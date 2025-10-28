import { Expose } from "class-transformer";
import { BaseEntity } from "src/Base/entity.base";
import { Column, Entity, OneToMany } from "typeorm";
import { User } from "./user.entity";
@Entity('roles')
export class Role extends BaseEntity {
    @Expose()
    @Column({
        name: 'name',
        type: 'varchar',
        length: 25,
        unique: true,
        nullable: false,
    })
    name: string
    @Expose()
    @Column({
        name: 'desc',
        type: 'varchar',
        length: 150,
        unique: true,
        nullable: true
    })
    description: string

    @OneToMany(() => User, (userRole) => userRole.role, { cascade: true })
    users: User[];
}