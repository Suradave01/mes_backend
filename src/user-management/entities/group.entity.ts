/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateGroupDef,
  StateGroupDef,
} from 'src/state/user-management/group-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PartitionMappingGroupModel, UserMappingGroupModel } from '.';

@Entity({ name: 'tb_group' })
export class GroupModel extends BaseState {
  constructor() {
    super(StateGroupDef, optionsStateGroupDef);
  }

  @PrimaryGeneratedColumn({
    name: 'group_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  group_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  group_description: string;

  @Column({
    type: 'integer',
  })
  default_role: number;

  @OneToMany(
    () => PartitionMappingGroupModel,
    (PartitionMappingGroup) => PartitionMappingGroup.Group,
  )
  @JoinColumn({ name: 'group_id' })
  PartitionMappingGroups: PartitionMappingGroupModel[];

  @OneToMany(
    () => UserMappingGroupModel,
    (UserMappingGroup) => UserMappingGroup.Group,
  )
  @JoinColumn({ name: 'group_id' })
  UserMappingGroups: UserMappingGroupModel[];
}
