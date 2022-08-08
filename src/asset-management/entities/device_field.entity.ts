import { BaseState } from 'src/share/lib/base-state';
import {
  StateDeviceFieldDef,
  optionsStateDeviceFieldDef,
  DeviceFieldTransition,
} from 'src/state/asset-management/device_field-state';
import { UserMappingCompanyTransition } from 'src/state/company-management/user_mapping_company-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DeviceModel, TriggerModel } from '.';

/* eslint-disable prettier/prettier */
@Entity({ name: 'tb_device_field' })
export class DeviceFieldModel extends BaseState {
  constructor() {
    super(StateDeviceFieldDef, optionsStateDeviceFieldDef);
  }

  @PrimaryGeneratedColumn({
    name: 'device_field_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  device_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_type: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  field_order: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  string_value: string;

  @Column({
    type: 'double',
    nullable: true,
  })
  number_value: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  last_update: string;

  @ManyToOne(() => DeviceModel, (device) => device.DeviceFields)
  @JoinColumn([{ name: 'device_id' }, { name: 'device_id' }])
  Device: DeviceModel;

  @OneToMany(() => TriggerModel, (trigger) => trigger.DeviceField)
  @JoinColumn([{ name: 'device_id' }])
  Triggers: TriggerModel[];

  CoDeviceFieldActive(context: DeviceModel, event) {
    this.apply(DeviceFieldTransition.CO_ACTIVE, context);
    this.saveState();
  }

  CoDeviceFieldInactive(context: DeviceModel, event) {
    this.apply(DeviceFieldTransition.CO_INACTIVE, context);
    this.saveState();
  }

  CoDeviceFieldDelete(context: DeviceModel, event) {
    this.apply(DeviceFieldTransition.DELETE, context);
    this.saveState();
  }
}
