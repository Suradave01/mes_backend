/* eslint-disable prettier/prettier */
import { CompanyModel } from 'src/company-management/entities/company.entity';
import { WipModel } from 'src/production-planning-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateAssetDef,
  optionsStateAssetDef,
  AssetTransition,
} from 'src/state/asset-management/asset-state';
import { UserModel } from 'src/user-management/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AssetMappingDeviceModel, TriggerModel } from '.';

@Entity({ name: 'tb_asset' })
export class AssetModel extends BaseState {
  constructor() {
    super(StateAssetDef, optionsStateAssetDef);
  }

  @PrimaryGeneratedColumn({
    name: 'asset_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  asset_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  company_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  wip_id: number;

  @ManyToOne(() => CompanyModel, (company) => company.Assets)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => UserModel, (user) => user.Assets)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  @ManyToOne(() => WipModel, (wip) => wip.WIPAssets)
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  WIPAsset: WipModel;

  @OneToMany(
    () => AssetMappingDeviceModel,
    (assetMappingDevice) => assetMappingDevice.Asset,
  )
  @JoinColumn([{ name: 'asset_id' }])
  AssetMappingDevices: AssetMappingDeviceModel[];

  @OneToMany(() => TriggerModel, (trigger) => trigger.Asset)
  @JoinColumn([{ name: 'asset_id' }])
  Triggers: TriggerModel[];

  // @OneToMany(() => WipModel, (wip) => wip.Asset)
  // @JoinColumn([{ name: 'asset_id' }])
  // WIP: WipModel[];

  CoCompanyDelete(context: CompanyModel, event) {
    this.apply(AssetTransition.DELETE, context);
    this.saveState();
  }
}
