/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import { StateUserMappingPartitionDef } from 'src/state/user-management/user_mapping_partition-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PartitionModel, UserModel } from '.';

import { UserMappingPartitionTransition } from '../../state/user-management/user_mapping_partition-state';

@Entity({ name: 'tb_user_mapping_partition' })
export class UserMappingPartitionModel extends BaseState {
  static role_mapping_permissions: any;
  constructor() {
    super(StateUserMappingPartitionDef);
  }

  @PrimaryGeneratedColumn({
    name: 'user_mapping_partition_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  partition_id: number;

  @Column({
    type: 'integer',
  })
  user_id: number;

  @ManyToOne(() => UserModel, (user) => user.UserMappingPartitions)
  @JoinColumn([{ name: 'user_id' }, { name: 'user_id' }])
  User: UserModel;

  @ManyToOne(
    () => PartitionModel,
    (partition) => partition.UserMappingPartitions,
  )
  @JoinColumn([{ name: 'partition_id' }, { name: 'partition_id' }])
  Partition: PartitionModel;

  CoPartitionDelete(context: PartitionModel, event) {
    this.apply(UserMappingPartitionTransition.DELETE, context);
    this.saveState();
  }

  CoUserDelete(context: UserModel, event) {
    this.apply(UserMappingPartitionTransition.DELETE, context);
    this.saveState();
  }
}
