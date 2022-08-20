/* eslint-disable prettier/prettier */
import { ChannelModel } from 'src/alarm-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateChannelMappingWipFlowDef,
  optionsStateChannelMappingWipFlowDef,
} from 'src/state/production-planning-management/channel_mapping_wip_flow-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { WipFlowModel } from '../../production-planning-management/entities/wip_flow.entity';
@Entity({ name: 'tb_channel_mapping_wip_flow' })
export class ChannelMappingWipFlowModel extends BaseState {
  constructor() {
    super(StateChannelMappingWipFlowDef, optionsStateChannelMappingWipFlowDef);
  }

  @PrimaryGeneratedColumn({
    name: 'channel_mapping_wip_flow_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  wip_flow_id: number;

  @Column({
    type: 'integer',
  })
  channel_id: number;

  @ManyToOne(() => ChannelModel, (channel) => channel.ChannelMappingWipFlows)
  @JoinColumn([{ name: 'channel_id' }, { name: 'channel_id' }])
  Channel: ChannelModel;

  @ManyToOne(() => WipFlowModel, (wipFlow) => wipFlow.ChannelMappingWipFlows)
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  WIPFlow: WipFlowModel;
}
