/* eslint-disable prettier/prettier */
import { ChannelModel } from 'src/alarm-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateChannelMappingWipDef,
  optionsStateChannelMappingWipDef,
} from 'src/state/production-planning-management/channel_mapping_wip-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WipModel } from './wip.entity';
@Entity({ name: 'tb_channel_mapping_wip' })
export class ChannelMappingWipModel extends BaseState {
  constructor() {
    super(StateChannelMappingWipDef, optionsStateChannelMappingWipDef);
  }

  @PrimaryGeneratedColumn({
    name: 'channel_mapping_wip_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  wip_id: number;

  @Column({
    type: 'integer',
  })
  channel_id: number;

  @ManyToOne(() => ChannelModel, (channel) => channel.ChannelMappingWips)
  @JoinColumn([{ name: 'channel_id' }, { name: 'channel_id' }])
  Channel: ChannelModel;

  @ManyToOne(() => WipModel, (wip) => wip.ChannelMappingWips)
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  WIP: WipModel;
}
