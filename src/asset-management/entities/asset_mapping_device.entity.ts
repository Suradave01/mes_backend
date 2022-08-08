/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StateAssetMappingDeviceDef,
  optionsStateAssetMappingDeviceDef,
} from 'src/state/asset-management/asset_mapping_device-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AssetModel, DeviceModel } from '.';

@Entity({ name: 'tb_asset_mapping_device' })
export class AssetMappingDeviceModel extends BaseState {
  constructor() {
    super(StateAssetMappingDeviceDef, optionsStateAssetMappingDeviceDef);
  }

  @PrimaryGeneratedColumn({
    name: 'asset_mapping_device_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  asset_id: number;

  @Column({
    type: 'integer',
  })
  device_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  device_order: number;

  @ManyToOne(() => AssetModel, (asset) => asset.AssetMappingDevices)
  @JoinColumn([{ name: 'asset_id' }, { name: 'asset_id' }])
  Asset: AssetModel;

  @ManyToOne(() => DeviceModel, (device) => device.AssetMappingDevices)
  @JoinColumn([{ name: 'device_id' }, { name: 'device_id' }])
  Device: DeviceModel;
}
