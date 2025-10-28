import { Expose } from "class-transformer";
import { BaseEntity } from "src/Base/entity.base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Role } from "./role.entity";
import { Bids } from "./bid.entity";

@Entity('user')
export class User extends BaseEntity {
    @Expose()
    @Column({
        name: 'userName',
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false,
    })
    userName: string
    @Expose()
    @Column({
        name: 'email',
        type: 'varchar',
        length: 150,
        unique: false,
        nullable: false,
    })
    email: string
    @Expose()
    @Column({
        name: 'password',
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false,
    })
    password: string
    @Expose()
    @Column({
        name: 'firstName',
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false,
    })
    firstName: string

    @Expose()
    @Column({
        name: 'lastName',
        type: 'varchar',
        length: 200,
        unique: true,
        nullable: false,
    })
    lastName: string




    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'roleId' })
    role: Role

    @Column()
    roleId: number;

    @OneToMany(() => Bids, (bid) => bid.user)
    bids: Bids[];

}