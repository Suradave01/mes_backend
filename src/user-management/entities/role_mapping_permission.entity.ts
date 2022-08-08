/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  RoleMappingPermissionTransition,
  StateRoleMappingPermissionDef,
} from 'src/state/user-management/role_mapping_permission-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PermissionModel, RoleModel } from '.';

@Entity({ name: 'tb_role_mapping_permission' })
export class RoleMappingPermissionModel extends BaseState {
  static role_mapping_permissions: any;
  constructor() {
    super(StateRoleMappingPermissionDef);
  }

  @PrimaryGeneratedColumn({
    name: 'role_mapping_permission_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'permission_id',
  })
  permission_id: number;

  @Column({
    name: 'role_id',
  })
  role_id: number;

  @ManyToOne(() => RoleModel, (role) => role.RoleMappingPermissions)
  @JoinColumn([{ name: 'role_id' }, { name: 'role_id' }])
  Role: RoleModel;

  @ManyToOne(
    () => PermissionModel,
    (permission) => permission.RoleMappingPermissions,
  )
  @JoinColumn([{ name: 'permission_id' }, { name: 'permission_id' }])
  Permission: PermissionModel;

  CoRoleDelete(context: RoleModel, event) {
    this.apply(RoleMappingPermissionTransition.DELETE, context);
    this.saveState();
  }

  CoPermissionDelete(context: PermissionModel, event) {
    this.apply(RoleMappingPermissionTransition.DELETE, context);
    this.saveState();
  }
}
