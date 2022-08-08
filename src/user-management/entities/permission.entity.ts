/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStatePermissionDef,
  StatePermissionDef,
} from 'src/state/user-management/permission-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ResourceModel, RoleMappingPermissionModel } from '.';

import { PermissionTransition } from '../../state/user-management/permission-state';

@Entity({ name: 'tb_permission' })
export class PermissionModel extends BaseState {
  constructor() {
    super(StatePermissionDef, optionsStatePermissionDef);
  }

  @PrimaryGeneratedColumn({
    name: 'permission_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  resource_id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  permission_name: string;

  @Column({
    type: 'integer',
  })
  permission: number;

  @OneToMany(
    () => RoleMappingPermissionModel,
    (RoleMappingPermission) => RoleMappingPermission.Permission,
  )
  @JoinColumn([{ name: 'permission_id' }])
  RoleMappingPermissions: RoleMappingPermissionModel[];

  @ManyToOne(() => ResourceModel, (resource) => resource.Permissions)
  @JoinColumn([{ name: 'resource_id' }, { name: 'resource_id' }])
  Resource: ResourceModel;

  CoResourceDelete(context: ResourceModel, event) {
    this.apply(PermissionTransition.DELETE, context);
    this.saveState();
  }
}
