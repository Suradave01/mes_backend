/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateResourceDef,
  StateResourceDef,
} from 'src/state/user-management/resource-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { MenuMappingRoleModel, PermissionModel } from '.';
import { ResourceType } from '../enum/resource.enum';

@Entity({ name: 'tb_resource' })
export class ResourceModel extends BaseState {
  // [x: string]: any;
  constructor() {
    super(StateResourceDef, optionsStateResourceDef);
  }

  @PrimaryGeneratedColumn({
    name: 'resource_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  resource_code: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  resource_name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  resource_type: ResourceType;

  @OneToMany(() => PermissionModel, (permission) => permission.Resource)
  @JoinColumn({ name: 'resource_id' })
  Permissions: PermissionModel[];

  @OneToMany(
    () => MenuMappingRoleModel,
    (MenuMappingRole) => MenuMappingRole.Resource,
  )
  @JoinColumn({ name: 'resource_id' })
  MenuMappingRoles: MenuMappingRoleModel[];
}
