/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import { StateImportDef } from 'src/state/company-management/import-state';
import { UserModel } from 'src/user-management/entities/user.entity';
import { WorkOrderItemModel } from '../../production-planning-management/entities/workorder_item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CustomerModel } from './customer.entity';
import { ProductionModel } from 'src/production-planning-management/entities';
import { ImportDataModel } from '.';
@Entity({ name: 'tb_import' })
export class ImportModel extends BaseState {
  constructor() {
    super(StateImportDef);
  }

  @PrimaryGeneratedColumn({
    name: 'import_id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'file_name',
    type: 'varchar',
  })
  file_name: string;

  @Column({
    name: 'file_type',
    type: 'varchar',
  })
  file_type: string;

  @ManyToOne(() => UserModel, (user) => user.Imports)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  @OneToMany(() => WorkOrderItemModel, (WorkOrderItem) => WorkOrderItem.Import)
  @JoinColumn([{ name: 'import_id' }])
  WorkOrderItems: WorkOrderItemModel[];

  @OneToMany(() => CustomerModel, (customer) => customer.Import)
  @JoinColumn([{ name: 'import_id' }])
  Customers: CustomerModel[];

  @OneToMany(() => ProductionModel, (production) => production.Import)
  @JoinColumn([{ name: 'import_id' }])
  Productions: ProductionModel[];

  @OneToMany(() => ImportDataModel, (ImportData) => ImportData.Import)
  @JoinColumn([{ name: 'import_id' }])
  ImportData: ImportDataModel[];
}
