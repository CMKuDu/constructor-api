import { BaseEntity } from "src/Base/entity.base";
import { Column, Entity, OneToMany } from "typeorm";
import { BidItems } from "./bid-item.entity";

@Entity('materials')
export class Material extends BaseEntity {
    @Column({ unique: true }) 
    code: string;
    
    @Column() 
    name: string;
    
    @Column({ nullable: true }) 
    unit?: string;
    
    @Column({ nullable: true }) 
    manufacturer?: string;
    
    @Column({ nullable: true }) 
    countryOfOrigin?: string;
    
    @Column({ nullable: true }) 
    content?: string;
    
    @Column({ nullable: true, type: 'decimal' }) 
    unitPrice?: number;
    
    @Column({ nullable: true }) 
    healthInsurance?: string;
    
    @Column({ nullable: true }) 
    groupCode?: string;
    
    @Column({ nullable: true }) 
    categoryCode?: string;
    
    @OneToMany(() => BidItems, (item) => item.material) 
    bidItems: BidItems[];
}