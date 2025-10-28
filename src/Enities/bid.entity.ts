import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BidItems } from './bid-item.entity';
import { BaseEntity } from 'src/Base/entity.base';
import { User } from './user.entity';


export enum BidStatus {
  DRAFT = 'DRAFT',
  SUBMITTING = 'SUBMITTING',
  EVALUATING = 'EVALUATING',
  WON = 'WON',
  LOST = 'LOST',
  CANCELLED = 'CANCELLED'
}
@Entity('bids')
export class Bids extends BaseEntity {
  @Column()
  userId: number;

  @Column({ unique: true })
  dossierCode: string;

  @Column()
  projectName: string;

  @Column({ nullable: true })
  packageName?: string;

  @Column({ nullable: true })
  biddingUnit?: string;

  @Column({ nullable: true, type: 'date' })
  openingDate?: Date;

  @Column({ nullable: true, type: 'date' })
  closingDate?: Date;

  @Column({ nullable: true })
  biddingMethod?: string;

  @Column({ nullable: true })
  implementationLocation?: string;

  @Column({ nullable: true })
  fundingSource?: string;

  @Column({
    type: 'enum',
    enum: BidStatus,
    default: 'DRAFT',
  })
  status: string;

  @Column({ nullable: true, type: 'decimal' })
  totalBidValue?: number;

  @Column({ nullable: true })
  notes?: string;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => BidItems, (item) => item.bid,{
    cascade: true
  })
  bidItems: BidItems[];
}