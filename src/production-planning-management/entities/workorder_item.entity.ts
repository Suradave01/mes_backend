import { UserModel } from './../../user-management/entities/user.entity';
/* eslint-disable prettier/prettier */
import { MessageModel } from 'src/alarm-management/entities';
import { AssetModel } from 'src/asset-management/entities/asset.entity';
import { DeviceModel } from 'src/asset-management/entities/device.entity';
import { ImportModel } from 'src/company-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateWorkOrderItemDef,
  optionsStateWorkOrderItemDef,
  WorkOrderItemTransition,
} from 'src/state/production-planning-management/workorder_item-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { WorkOrderModel } from './workorder.entity';
import { WipFlowMappingModel } from './wip_flow_mapping.entity';
import { WorkOrderTransition } from 'src/state/production-planning-management/workorder-state';
@Entity({ name: 'tb_workorder_item' })
export class WorkOrderItemModel extends BaseState {
  constructor() {
    super(StateWorkOrderItemDef, optionsStateWorkOrderItemDef);
  }

  @PrimaryGeneratedColumn({
    name: 'workorder_item_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  workorder_id: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  wip_flow_mapping_id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  remark_by: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  remark: string;

  @Column({
    type: 'integer',
  })
  import_id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  field_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  field_value: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  asset_cancel_count: number;

  @OneToMany(() => MessageModel, (message) => message.workOrderItem)
  @JoinColumn([{ name: 'workorder_item_id' }])
  Messages: MessageModel[];

  @ManyToOne(() => ImportModel, (imports) => imports.WorkOrderItems)
  @JoinColumn([{ name: 'import_id' }, { name: 'import_id' }])
  Import: ImportModel;

  @ManyToOne(() => WorkOrderModel, (workOrder) => workOrder.WorkOrderItems)
  @JoinColumn([{ name: 'workorder_id' }, { name: 'workorder_id' }])
  WorkOrder: WorkOrderModel;

  @ManyToOne(
    () => WipFlowMappingModel,
    (wipFlowMapping) => wipFlowMapping.WorkOrderItems,
  )
  @JoinColumn([{ name: 'wip_flow_mapping_id' }])
  WipFlowMapping: WipFlowMappingModel;

  @ManyToOne(() => UserModel, (user) => user.WorkOrderItems)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;
}
