/* eslint-disable prettier/prettier */
import { ProductionModel } from 'src/production-planning-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import { StateCustomerDef } from 'src/state/company-management/customer-state';
import { UserModel } from 'src/user-management/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CompanyModel, ImportModel } from '.';
@Entity({ name: 'tb_customer' })
export class CustomerModel extends BaseState {
  constructor() {
    super(StateCustomerDef);
  }

  @PrimaryGeneratedColumn({
    name: 'customer_id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'company_id',
    type: 'integer',
    nullable: true,
  })
  company_id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  customer_no: string;

  @Column({
    nullable: true,
  })
  import_id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
  })
  md5_dataVersion: string;

  @Column({
    nullable: true,
    type: 'simple-json',
    default: '{}',
  })
  raw_data: { raw_data: object[] };

  @ManyToOne(() => CompanyModel, (company) => company.Customers)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => UserModel, (user) => user.Customers)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  @ManyToOne(() => ImportModel, (imports) => imports.Customers)
  @JoinColumn([{ name: 'import_id' }, { name: 'import_id' }])
  Import: ImportModel;

  @OneToMany(() => ProductionModel, (production) => production.Customer)
  @JoinColumn([{ name: 'customer_id' }, { name: 'customer_id' }])
  Productions: ProductionModel[];
}
