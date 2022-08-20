/* eslint-disable prettier/prettier */
import { ChannelMappingWipModel } from 'src/alarm-management/entities';
import { AssetModel } from 'src/asset-management/entities';
import { CompanyModel } from 'src/company-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateWipDef,
  optionsStateWipDef,
} from 'src/state/production-planning-management/wip.state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WipFlowMappingModel } from './wip_flow_mapping.entity';
@Entity({ name: 'tb_wip' })
export class WipModel extends BaseState {
  constructor() {
    super(StateWipDef, optionsStateWipDef);
  }

  @PrimaryGeneratedColumn({
    name: 'wip_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
    type: 'integer',
  })
  company_id: number;

  // @Column({
  //   nullable: true,
  //   type: 'integer',
  // })
  // asset_id: number;

  // @Column({
  //   type: 'integer',
  //   nullable: true,
  // })
  // max_wip: number;

  @Column({
    nullable: true,
    type: 'simple-json',
    default: '{}',
  })
  field_default: { fieldDefault: object[] };

  // @Column({
  //   type: 'varchar',
  //   length: 200,
  //   nullable: true,
  // })
  // calculate_function: string;

  // @Column({
  //   type: 'text',
  //   nullable: true,
  // })
  // presentation_template: string;

  @OneToMany(() => AssetModel, (asset) => asset.WIPAsset)
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  WIPAssets: AssetModel[];

  @OneToMany(() => WipFlowMappingModel, (wipFlowMapping) => wipFlowMapping.WIP)
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  WipFlowMappings: WipFlowMappingModel[];

  @OneToMany(
    () => ChannelMappingWipModel,
    (channelMappingWip) => channelMappingWip.WIP,
  )
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  ChannelMappingWips: ChannelMappingWipModel[];

  @ManyToOne(() => CompanyModel, (company) => company.WIP)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  // @ManyToOne(() => AssetModel, (asset) => asset.WIP)
  // @JoinColumn([{ name: 'asset_id' }, { name: 'asset_id' }])
  // Asset: AssetModel;
}
