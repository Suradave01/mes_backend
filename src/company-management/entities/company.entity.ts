/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateCompanyDef,
  StateCompanyDef,
} from 'src/state/company-management/company-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { AssetModel, DeviceModel } from 'src/asset-management/entities';
import { ContactModel } from 'src/contact-management/entities';
import { CustomerModel } from '.';
import {
  UserMappingCompanyModel,
  UserModel,
} from 'src/user-management/entities';
import {
  ProductionModel,
  WipFlowModel,
  WipModel,
} from 'src/production-planning-management/entities';
@Entity({ name: 'tb_company' })
export class CompanyModel extends BaseState {
  constructor() {
    super(StateCompanyDef, optionsStateCompanyDef);
  }

  @PrimaryGeneratedColumn({
    name: 'company_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  telephone_no: string;

  @OneToMany(() => CustomerModel, (Customer) => Customer.Company)
  @JoinColumn([{ name: 'company_id' }])
  Customers: CustomerModel[];

  @OneToMany(
    () => UserMappingCompanyModel,
    (UserMappingCompany) => UserMappingCompany.Company,
  )
  @JoinColumn([{ name: 'company_id' }])
  UserMappingCompanies: UserMappingCompanyModel[];

  @OneToMany(() => AssetModel, (asset) => asset.Company)
  @JoinColumn([{ name: 'company_id' }])
  Assets: AssetModel[];

  @OneToMany(() => DeviceModel, (device) => device.Company)
  @JoinColumn([{ name: 'company_id' }])
  Devices: DeviceModel[];

  @OneToMany(() => ContactModel, (contact) => contact.Company)
  @JoinColumn([{ name: 'company_id' }])
  Contacts: ContactModel[];

  @OneToMany(() => WipModel, (wip) => wip.Company)
  @JoinColumn([{ name: 'company_id' }])
  WIP: WipModel[];

  @OneToMany(() => WipFlowModel, (wipFlow) => wipFlow.Company)
  @JoinColumn([{ name: 'company_id' }])
  WIPFlow: WipFlowModel[];

  @OneToMany(() => ProductionModel, (production) => production.Company)
  @JoinColumn([{ name: 'company_id' }])
  Productions: ProductionModel[];

  @ManyToOne(() => UserModel, (user) => user.Companies)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;
}
