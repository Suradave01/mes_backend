/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  MenuMappingRoleTransition,
  StateMenuMappingRoleDef,
} from 'src/state/user-management/menu_mapping_role-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ResourceModel, RoleModel } from '.';

@Entity({ name: 'tb_menu_mapping_role' })
export class MenuMappingRoleModel extends BaseState {
  static menu_mapping_role: any;
  constructor() {
    super(StateMenuMappingRoleDef);
  }

  @PrimaryGeneratedColumn({
    name: 'menu_mapping_role_id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'resource_id',
    type: 'integer',
  })
  resource_id: number;

  @Column({
    name: 'role_id',
    type: 'integer',
  })
  role_id: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  description: string;

  @ManyToOne(() => RoleModel, (role) => role.MenuMappingRoles)
  @JoinColumn([{ name: 'role_id' }, { name: 'role_id' }])
  Role: RoleModel;

  @ManyToOne(() => ResourceModel, (resource) => resource.MenuMappingRoles)
  @JoinColumn([{ name: 'resource_id' }, { name: 'resource_id' }])
  Resource: ResourceModel;

  CoResourceDelete(context: ResourceModel, event) {
    this.apply(MenuMappingRoleTransition.DELETE, context);
    this.saveState();
  }

  CoRoleDelete(context: RoleModel, event) {
    this.apply(MenuMappingRoleTransition.DELETE, context);
    this.saveState();
  }
}
