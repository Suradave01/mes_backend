/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StateWorkOrderDef,
  optionsStateWorkOrderDef,
  WorkOrderTransition,
} from 'src/state/production-planning-management/workorder-state';
import { UserModel } from 'src/user-management/entities';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ProductionModel } from './production.entity';
import { WipFlowModel } from './wip_flow.entity';
import { WorkOrderItemModel } from './workorder_item.entity';
@Entity({ name: 'tb_workorder' })
export class WorkOrderModel extends BaseState {
  constructor() {
    super(StateWorkOrderDef, optionsStateWorkOrderDef);
  }

  @PrimaryGeneratedColumn({
    name: 'workorder_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  workorder_no: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  production_id: number;

  @Column({
    type: 'integer',
  })
  wip_flow_id: number;

  @Column({
    type: 'double',
  })
  prioritize: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  note: string;

  @Column({
    nullable: true,
    type: 'integer',
  })
  copy_ref: number;

  @ManyToOne(() => ProductionModel, (production) => production.WorkOrders)
  @JoinColumn([{ name: 'production_id' }])
  Production: ProductionModel;

  @ManyToOne(() => WipFlowModel, (wipFlow) => wipFlow.WorkOrders)
  @JoinColumn([{ name: 'wip_flow_id' }, { name: 'wip_flow_id' }])
  WIPFlow: WipFlowModel;

  @OneToMany(
    () => WorkOrderItemModel,
    (workOrderItem) => workOrderItem.WorkOrder,
  )
  @JoinColumn([{ name: 'workorder_id' }, { name: 'workorder_id' }])
  WorkOrderItems: WorkOrderItemModel;

  @ManyToOne(() => UserModel, (user) => user.WorkOrders)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  CoProcessWorkOrder(context, event) {
    if (context.WorkOrder.state == 'ready') {
      this.apply(WorkOrderTransition.CO_PROCESS, context);
      this.saveState();
    }
  }

  CoCompleteWorkOrder(context, event) {
    // if (context.WorkOrder.state == 'on_process') {
    //   this.apply(WorkOrderTransition.CO_COMPLETE, context);
    //   this.saveState();
    // }
  }

  CoCompleteWithConditionWorkOrder(context, event) {
    if (context.WorkOrder.state == 'on_process') {
      this.apply(WorkOrderTransition.CO_COMPLETE_WITH_CONDITION, context);
      this.saveState();
    }
  }

  CoRetrieveWorkOrder(context, event) {
    if (context.WorkOrder.state == 'complete_with_condition') {
      this.apply(WorkOrderTransition.CO_RETRIEVE, context);
      this.saveState();
    }
  }
}
