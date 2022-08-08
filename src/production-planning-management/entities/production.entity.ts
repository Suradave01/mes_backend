/* eslint-disable prettier/prettier */
import { AssetModel } from 'src/asset-management/entities/asset.entity';
import { DeviceModel } from 'src/asset-management/entities/device.entity';
import {
  CompanyModel,
  CustomerModel,
  ImportModel,
} from 'src/company-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateProductionDef,
  optionsStateProductionDef,
} from 'src/state/production-planning-management/production-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { WipFlowModel } from './wip_flow.entity';
import { WorkOrderModel } from './workorder.entity';
@Entity({ name: 'tb_production' })
export class ProductionModel extends BaseState {
  constructor() {
    super(StateProductionDef, optionsStateProductionDef);
  }

  @PrimaryGeneratedColumn({
    name: 'production_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  import_id: number;

  @Column({
    type: 'integer',
  })
  company_id: number;

  @Column({
    type: 'integer',
  })
  master_no: number;

  @Column({
    type: 'integer',
  })
  customer_id: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'integer',
  })
  quantity: number;

  @Column({
    name: 'workorder_no',
    type: 'integer',
  })
  workOrder_no: number;

  @Column({
    name: 'workorder_code',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  workOrder_code: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  order_date: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  due_date: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  author: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  seller: string;

  @Column({
    name: 'md5_dataversion',
    type: 'varchar',
    length: 255,
  })
  md5_dataVersion: string;

  @ManyToOne(() => CompanyModel, (company) => company.Productions)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => ImportModel, (imports) => imports.Productions)
  @JoinColumn([{ name: 'import_id' }, { name: 'import_id' }])
  Import: ImportModel;

  @ManyToOne(() => CustomerModel, (customer) => customer.Productions)
  @JoinColumn([{ name: 'customer_id' }, { name: 'customer_id' }])
  Customer: CustomerModel;

  @OneToMany(() => WipFlowModel, (wipFlow) => wipFlow.Production)
  @JoinColumn([{ name: 'production_id' }, { name: 'production_id' }])
  WIPFlows: WipFlowModel[];

  @OneToMany(() => WorkOrderModel, (workOrder) => workOrder.Production)
  @JoinColumn([{ name: 'production_id' }])
  WorkOrders: WorkOrderModel[];
}
