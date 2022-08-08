/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStatePartitionDef,
  StatePartitionDef,
} from 'src/state/user-management/partition-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PartitionMappingGroupModel, UserMappingPartitionModel } from '.';

@Entity({ name: 'tb_partition' })
export class PartitionModel extends BaseState {
  constructor() {
    super(StatePartitionDef, optionsStatePartitionDef);
  }

  @PrimaryGeneratedColumn({
    name: 'partition_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  partition_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  partition_description: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  model_name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  sql_append: string;

  @OneToMany(
    () => PartitionMappingGroupModel,
    (PartitionMappingGroup) => PartitionMappingGroup.Partition,
  )
  @JoinColumn({ name: 'partition_id' })
  PartitionMappingGroups: PartitionMappingGroupModel[];

  @OneToMany(
    () => UserMappingPartitionModel,
    (UserMappingPartition) => UserMappingPartition.Partition,
  )
  @JoinColumn({ name: 'partition_id' })
  UserMappingPartitions: UserMappingPartitionModel[];
}
