import { CompanyModel } from 'src/company-management/entities/company.entity';
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateDeviceDef,
  StateDeviceDef,
} from 'src/state/asset-management/device-state';
import { UserModel } from 'src/user-management/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AssetMappingDeviceModel, DeviceFieldModel } from '.';

/* eslint-disable prettier/prettier */
@Entity({ name: 'tb_device' })
export class DeviceModel extends BaseState {
  constructor() {
    super(StateDeviceDef, optionsStateDeviceDef);
  }

  @PrimaryGeneratedColumn({
    name: 'device_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  company_id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  device_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @OneToMany(
    () => AssetMappingDeviceModel,
    (assetMappingDevice) => assetMappingDevice.Device,
  )
  @JoinColumn([{ name: 'device_id' }])
  AssetMappingDevices: AssetMappingDeviceModel[];

  @ManyToOne(() => CompanyModel, (company) => company.Devices)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => UserModel, (user) => user.Devices)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  @OneToMany(() => DeviceFieldModel, (deviceField) => deviceField.Device)
  @JoinColumn([{ name: 'device_id' }])
  DeviceFields: DeviceFieldModel[];
}
