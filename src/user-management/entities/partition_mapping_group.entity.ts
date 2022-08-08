/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StatePartitionMappingGroupDef,
  optionsStatePartitionMappingGroupDef,
  PartitionMappingGroupTransition,
} from 'src/state/user-management/partition_mapping_group-state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { GroupModel, PartitionModel } from '.';

@Entity({ name: 'tb_partition_mapping_group' })
export class PartitionMappingGroupModel extends BaseState {
  constructor() {
    super(StatePartitionMappingGroupDef, optionsStatePartitionMappingGroupDef);
  }

  @PrimaryGeneratedColumn({
    name: 'partition_mapping_group_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  group_id: number;

  @Column({
    type: 'integer',
  })
  partition_id: number;

  @ManyToOne(
    () => PartitionModel,
    (partition) => partition.PartitionMappingGroups,
  )
  @JoinColumn([{ name: 'partition_id' }, { name: 'partition_id' }])
  Partition: PartitionModel;

  @ManyToOne(() => GroupModel, (group) => group.PartitionMappingGroups)
  @JoinColumn([{ name: 'group_id' }, { name: 'group_id' }])
  Group: GroupModel;

  CoPartitionDelete(context: PartitionModel, event) {
    this.apply(PartitionMappingGroupTransition.DELETE, context);
    this.saveState();
  }

  CoGroupDelete(context: GroupModel, event) {
    this.apply(PartitionMappingGroupTransition.DELETE, context);
    this.saveState();
  }
}
