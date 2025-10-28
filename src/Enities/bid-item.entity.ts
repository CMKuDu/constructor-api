import { BaseEntity } from 'src/Base/entity.base';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bids } from './bid.entity';
import { Material } from './material.entity';

@Entity('bid_items')
export class BidItems extends BaseEntity {
  @Column()
  bidId: number;

  @Column()
  materialId: number;

  @Column()
  orderNumber: number;

  @Column()
  biddingProductName: string;

  @Column()
  biddingUnit: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal' })
  bidPrice: number;

  @Column({ type: 'decimal' })
  totalAmount: number;

  @Column({ nullable: true })
  manufacturer?: string;

  @Column({ nullable: true })
  countryOfOrigin?: string;

  @Column({ nullable: true })
  notes?: string;

  // Relations
  @ManyToOne(() => Bids, (bid) => bid.bidItems)
  @JoinColumn({ name: 'bidId' })
  bid: Bids;

  @ManyToOne(() => Material, (material) => material.bidItems)
  @JoinColumn({ name: 'materialId' })
  material: Material;
}