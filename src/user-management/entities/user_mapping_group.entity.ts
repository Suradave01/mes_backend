/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StateUserMappingGroupDef,
  UserMappingGroupTransition,
} from 'src/state/user-management/user_mapping_group-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GroupModel, UserModel } from '.';

@Entity({ name: 'tb_user_mapping_group' })
export class UserMappingGroupModel extends BaseState {
  static user_mapping_group: any;
  constructor() {
    super(StateUserMappingGroupDef);
  }

  @PrimaryGeneratedColumn({
    name: 'user_mapping_group_id',
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
  user_id: number;

  @ManyToOne(() => UserModel, (user) => user.UserMappingGroups)
  @JoinColumn([{ name: 'user_id' }, { name: 'user_id' }])
  User: UserModel;

  @ManyToOne(() => GroupModel, (group) => group.UserMappingGroups)
  @JoinColumn([{ name: 'group_id' }, { name: 'group_id' }])
  Group: GroupModel;

  CoGroupDelete(context: GroupModel, event) {
    this.apply(UserMappingGroupTransition.DELETE, context);
    this.saveState();
  }

  CoUserDelete(context: UserModel, event) {
    this.apply(UserMappingGroupTransition.DELETE, context);
    this.saveState();
  }
}
