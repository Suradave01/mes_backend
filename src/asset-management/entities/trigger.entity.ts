/* eslint-disable prettier/prettier */
import { ChannelModel, MessageModel } from 'src/alarm-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateTriggerDef,
  optionsStateTriggerDef,
} from 'src/state/asset-management/trigger-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AssetModel, ConditionTypeModel, DeviceFieldModel } from '.';

@Entity({ name: 'tb_trigger' })
export class TriggerModel extends BaseState {
  constructor() {
    super(StateTriggerDef, optionsStateTriggerDef);
  }

  @PrimaryGeneratedColumn({
    name: 'trigger_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  trigger_name: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  asset_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  channel_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  value: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  condition_type_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  device_field_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  type: string;

  @ManyToOne(() => AssetModel, (asset) => asset.Triggers)
  @JoinColumn([{ name: 'asset_id' }, { name: 'asset_id' }])
  Asset: AssetModel;

  @ManyToOne(() => DeviceFieldModel, (deviceField) => deviceField.Triggers)
  @JoinColumn([{ name: 'device_field_id' }, { name: 'device_field_id' }])
  DeviceField: DeviceFieldModel;

  @ManyToOne(
    () => ConditionTypeModel,
    (conditionType) => conditionType.Triggers,
  )
  @JoinColumn([{ name: 'condition_type_id' }, { name: 'condition_type_id' }])
  ConditionType: ConditionTypeModel;

  @ManyToOne(() => ChannelModel, (channel) => channel.Triggers)
  @JoinColumn([{ name: 'channel_id' }, { name: 'channel_id' }])
  Channel: ChannelModel;

  @OneToMany(() => MessageModel, (message) => message.Trigger)
  @JoinColumn([{ name: 'trigger_id' }])
  Messages: MessageModel[];
}
