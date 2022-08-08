/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import { StateUserMappingRoleDef } from 'src/state/user-management/user_mapping_role-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoleModel, UserModel } from '.';

import { UserMappingRoleTransition } from '../../state/user-management/user_mapping_role-state';

@Entity({ name: 'tb_user_mapping_role' })
export class UserMappingRoleModel extends BaseState {
  static user_mapping_role: any;
  constructor() {
    super(StateUserMappingRoleDef);
  }

  @PrimaryGeneratedColumn({
    name: 'user_mapping_role_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  user_id: number;

  @Column({
    type: 'integer',
  })
  role_id: number;

  @ManyToOne(() => UserModel, (user) => user.UserMappingRoles)
  @JoinColumn([{ name: 'user_id' }, { name: 'user_id' }])
  User: UserModel;

  @ManyToOne(() => RoleModel, (role) => role.UserMappingRoles)
  @JoinColumn([{ name: 'role_id' }, { name: 'role_id' }])
  Role: RoleModel;

  CoRoleDelete(context: RoleModel, event) {
    this.apply(UserMappingRoleTransition.DELETE, context);
    this.saveState();
  }

  CoUserDelete(context: UserModel, event) {
    this.apply(UserMappingRoleTransition.DELETE, context);
    this.saveState();
  }
}
