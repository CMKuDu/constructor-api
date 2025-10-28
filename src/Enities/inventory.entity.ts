import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/Base/entity.base';

@Entity('inventories')
export class Inventories extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  inboundNumber?: string;

  @Column({ nullable: true })
  outboundNumber?: string;

  @Column({ nullable: true })
  materialCode?: string;

  @Column({ nullable: true })
  materialName?: string;

  @Column({ nullable: true })
  activeIngredient?: string;

  @Column({ nullable: true })
  form?: string;

  @Column({ nullable: true })
  brandName?: string;

  @Column({ nullable: true })
  countryName?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'decimal', nullable: true })
  openingBalance?: number;

  @Column({ type: 'decimal', nullable: true })
  openingBalanceValue?: number;

  @Column({ type: 'decimal', nullable: true })
  inboundQuantity?: number;

  @Column({ type: 'decimal', nullable: true })
  inboundValue?: number;

  @Column({ type: 'decimal', nullable: true })
  outboundQuantity?: number;

  @Column({ type: 'decimal', nullable: true })
  outboundValue?: number;

  @Column({ type: 'decimal', nullable: true })
  closingBalance?: number;

  @Column({ type: 'decimal', nullable: true })
  closingBalanceValue?: number;

  @Column({ type: 'decimal', nullable: true })
  unitPrice?: number;

  @Column({ nullable: true })
  expiryDate?: string;

  @Column({ nullable: true })
  lotNumber?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  groupName?: string;

  @Column({ nullable: true })
  printGroupName?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  contractNumber?: string;

  @Column({ type: 'date', nullable: true })
  contractDate?: Date;

  @Column({ nullable: true })
  patientCode?: string;

  @Column({ nullable: true })
  fullName?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'int', nullable: true })
  birthYear?: number;

  @Column({ nullable: true })
  bloodType?: string;

  @Column({ nullable: true })
  doctorName?: string;

  @Column({ nullable: true })
  volume?: string;

  @Column({ nullable: true })
  departmentName?: string;

  @Column({ nullable: true })
  bidCode?: string;

  @Column({ type: 'decimal', nullable: true })
  bidQuantity?: number;

  @Column({ type: 'decimal', nullable: true })
  bidInboundQuantity?: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  formName?: string;

  @Column({ nullable: true })
  dispensingDepartment?: string;

  @Column({ nullable: true })
  storageNumber?: string;

  @Column({ nullable: true })
  setGroup?: string;

  @Column({ nullable: true })
  sequenceCode?: string;

  @Column({ nullable: true })
  cardNumber?: string;
}