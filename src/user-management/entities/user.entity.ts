import {
  WorkOrderItemModel,
  WorkOrderModel,
} from 'src/production-planning-management/entities';
/* eslint-disable prettier/prettier */
import { ChannelModel } from 'src/alarm-management/entities';
import { AssetModel, DeviceModel } from 'src/asset-management/entities';
import { CompanyModel, CustomerModel } from 'src/company-management/entities';
import { ImportModel } from 'src/company-management/entities/import.entity';
import { ContactModel } from 'src/contact-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import * as bcrypt from 'bcrypt';
import {
  optionsStateUserDef,
  StateUserDef,
} from 'src/state/user-management/user-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import {
  UserMappingCompanyModel,
  UserMappingGroupModel,
  UserMappingPartitionModel,
  UserMappingRoleModel,
} from '.';

@Entity({ name: 'tb_user' })
export class UserModel extends BaseState {
  constructor() {
    super(StateUserDef, optionsStateUserDef);
  }

  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'integer',
  })
  id: number;

  @Column({
    nullable: true,
  })
  is_system: boolean;

  @Column({ unique: true, type: 'varchar', length: 100 })
  username: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  @OneToMany(
    () => UserMappingPartitionModel,
    (UserMappingPartition) => UserMappingPartition.User,
  )
  @JoinColumn({ name: 'user_id' })
  UserMappingPartitions: UserMappingPartitionModel[];

  @OneToMany(
    () => UserMappingGroupModel,
    (UserMappingGroup) => UserMappingGroup.User,
  )
  @JoinColumn({ name: 'user_id' })
  UserMappingGroups: UserMappingGroupModel[];

  @OneToMany(
    () => UserMappingRoleModel,
    (UserMappingRole) => UserMappingRole.User,
  )
  @JoinColumn({ name: 'user_id' })
  UserMappingRoles: UserMappingRoleModel[];

  @OneToMany(
    () => UserMappingCompanyModel,
    (UserMappingCompany) => UserMappingCompany.User,
  )
  @JoinColumn([{ name: 'user_id' }])
  UserMappingCompanies: UserMappingCompanyModel[];

  @OneToMany(() => CompanyModel, (contact) => contact.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Companies: CompanyModel[];

  @OneToMany(() => CustomerModel, (contact) => contact.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Customers: CustomerModel[];

  @OneToMany(() => ContactModel, (contact) => contact.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Contacts: ContactModel[];

  @OneToMany(() => ChannelModel, (contact) => contact.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Channels: ChannelModel[];

  @OneToMany(() => ImportModel, (importData) => importData.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Imports: ImportModel[];

  @OneToMany(() => AssetModel, (asset) => asset.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Assets: AssetModel[];

  @OneToMany(() => DeviceModel, (device) => device.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  Devices: DeviceModel[];

  @OneToMany(() => WorkOrderModel, (workOrder) => workOrder.CreateBy)
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  WorkOrders: WorkOrderModel[];

  @OneToMany(
    () => WorkOrderItemModel,
    (workOrderItem) => workOrderItem.CreateBy,
  )
  @JoinColumn([{ name: 'user_id' }, { name: 'create_by' }])
  WorkOrderItems: WorkOrderItemModel[];
}
