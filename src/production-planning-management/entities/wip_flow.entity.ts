/* eslint-disable prettier/prettier */
import { CompanyModel } from 'src/company-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateWipFlowDef,
  optionsStateWipFlowDef,
} from 'src/state/production-planning-management/wip_flow-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ChannelMappingWipFlowModel } from './channel_mapping_wip_flow.entity';
import { ProductionModel } from './production.entity';
import { WipFlowMappingModel } from './wip_flow_mapping.entity';
import { WorkOrderModel } from './workorder.entity';
@Entity({ name: 'tb_wip_flow' })
export class WipFlowModel extends BaseState {
  constructor() {
    super(StateWipFlowDef, optionsStateWipFlowDef);
  }

  @PrimaryGeneratedColumn({
    name: 'wip_flow_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  production_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  ref_wip_flow_id: number;

  @Column({
    type: 'integer',
  })
  company_id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  wip_flow_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  // @Column({
  //   type: 'varchar',
  //   length: 200,
  //   nullable: true,
  // })
  // field_default: string;

  // @Column({
  //   type: 'varchar',
  //   length: 200,
  //   nullable: true,
  // })
  // calculate_function: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  presentation_template: string;

  @Column({
    nullable: true,
  })
  is_template: boolean;

  @OneToMany(() => WorkOrderModel, (workOrder) => workOrder.WIPFlow)
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  WorkOrders: WorkOrderModel[];

  @OneToMany(
    () => ChannelMappingWipFlowModel,
    (channelMappingWipFlow) => channelMappingWipFlow.WIPFlow,
  )
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  ChannelMappingWipFlows: ChannelMappingWipFlowModel[];

  @OneToMany(
    () => WipFlowMappingModel,
    (wipFlowMappingModel) => wipFlowMappingModel.WIPFlow,
  )
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  WipFlowMappings: WipFlowMappingModel[];

  @ManyToOne(() => CompanyModel, (company) => company.WIPFlow)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => ProductionModel, (production) => production.WIPFlows)
  @JoinColumn([{ name: 'production_id' }, { name: 'production_id' }])
  Production: ProductionModel;
}
