import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateRoleDef,
  StateRoleDef,
} from 'src/state/user-management/role-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import {
  MenuMappingRoleModel,
  RoleMappingPermissionModel,
  UserMappingRoleModel,
} from '.';

@Entity({ name: 'tb_role' })
export class RoleModel extends BaseState {
  constructor() {
    super(StateRoleDef, optionsStateRoleDef);
  }

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'role_id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'role_name',
  })
  role_name: string;

  @Column({
    type: 'text',
    name: 'role_description',
    nullable: true,
  })
  role_description: string;

  @OneToMany(
    () => RoleMappingPermissionModel,
    (RoleMappingPermission) => RoleMappingPermission.Role,
  )
  @JoinColumn({ name: 'role_id' })
  RoleMappingPermissions: RoleMappingPermissionModel[];

  @OneToMany(
    () => MenuMappingRoleModel,
    (MenuMappingRole) => MenuMappingRole.Role,
  )
  @JoinColumn({ name: 'role_id' })
  MenuMappingRoles: MenuMappingRoleModel[];

  @OneToMany(
    () => UserMappingRoleModel,
    (UserMappingRole) => UserMappingRole.Role,
  )
  @JoinColumn({ name: 'role_id' })
  UserMappingRoles: UserMappingRoleModel[];
}
