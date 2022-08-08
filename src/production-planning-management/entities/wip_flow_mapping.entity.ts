/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StateWipFlowMappingDef,
  optionsStateWipFlowMappingDef,
} from 'src/state/production-planning-management/wip_flow_mapping-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { WipModel } from './wip.entity';
import { WipFlowModel } from './wip_flow.entity';
import { WorkOrderItemModel } from './workorder_item.entity';
@Entity({ name: 'tb_wip_flow_mapping' })
export class WipFlowMappingModel extends BaseState {
  constructor() {
    super(StateWipFlowMappingDef, optionsStateWipFlowMappingDef);
  }

  @PrimaryGeneratedColumn({
    name: 'wip_flow_mapping_id',
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
  wip_id: number;

  @Column({
    type: 'integer',
  })
  wip_sequence: number;

  @OneToMany(
    () => WorkOrderItemModel,
    (workOrderItem) => workOrderItem.WipFlowMapping,
  )
  @JoinColumn([{ name: 'wip_flow_mapping_id' }])
  WorkOrderItems: WorkOrderItemModel;

  @ManyToOne(() => WipFlowModel, (company) => company.WipFlowMappings)
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  WIPFlow: WipFlowModel;

  @ManyToOne(() => WipModel, (wip) => wip.WipFlowMappings)
  @JoinColumn([{ name: 'wip_id' }, { name: 'wip_id' }])
  WIP: WipModel;
}
