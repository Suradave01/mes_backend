/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { PermissionTransition } from 'src/state/user-management/permission-state';
import { ResourceTransition } from 'src/state/user-management/resource-state';
import { RoleTransition } from 'src/state/user-management/role-state';
import { Connection, getConnection, Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { MenuMappingRoleModel } from './entities/menu_mapping_role.entity';
import { PermissionModel } from './entities/permission.entity';
import { ResourceModel } from './entities/resource.entity';
import { RoleMappingPermissionModel } from './entities/role_mapping_permission.entity';
import { RoleModel } from './entities/role.entity';
import { PartitionModel } from './entities/partition.entity';
import { GroupModel } from './entities/group.entity';
import { CreatePartitionDto } from './dto/create-partition.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { PartitionMappingGroupModel } from './entities/partition_mapping_group.entity';
import { PartitionTransition } from 'src/state/user-management/partition-state';
import { GroupTransition } from 'src/state/user-management/group-state';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './entities/user.entity';
import { UserMappingRoleModel } from './entities/user_mapping_role.entity';
import { UserMappingPartitionModel } from './entities/user_mapping_partition.entity';
import { UserMappingGroupModel } from './entities/user_mapping_group.entity';
import { UserTransition } from 'src/state/user-management/user-state';
import { ServerSideRender } from 'src/share/server-side-render';
import { CompanyManagementService } from 'src/company-management/company-management.service';
import { UpdatePartitionDto } from './dto/update-partition.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PartitionMappingGroupTransition } from 'src/state/user-management/partition_mapping_group-state';
import { MenuMappingRoleTransition } from 'src/state/user-management/menu_mapping_role-state';
import { RoleMappingPermissionTransition } from 'src/state/user-management/role_mapping_permission-state';
import { UserMappingPartitionTransition } from 'src/state/user-management/user_mapping_partition-state';
import { UserMappingGroupTransition } from 'src/state/user-management/user_mapping_group-state';
import { UserMappingRoleTransition } from 'src/state/user-management/user_mapping_role-state';
import { UserMappingCompanyTransition } from 'src/state/company-management/user_mapping_company-state';
import { UserMappingCompanyModel } from './entities';
import { AuthCredentialsDto } from '../authentication/dto/authCredentials.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserManagementService {
  constructor(
    private readonly connection: Connection,

    @InjectRepository(PartitionModel)
    private readonly PartitionModelRepository: Repository<PartitionModel>,

    @InjectRepository(GroupModel)
    private readonly GroupModelRepository: Repository<GroupModel>,

    @InjectRepository(RoleModel)
    private readonly RoleModelRepository: Repository<RoleModel>,

    @InjectRepository(PermissionModel)
    private readonly PermissionModelRepository: Repository<PermissionModel>,

    @InjectRepository(UserModel)
    private readonly UserModelRepository: Repository<UserModel>,

    @InjectRepository(ResourceModel)
    private readonly ResourceModelRepository: Repository<ResourceModel>,

    @InjectRepository(PartitionMappingGroupModel)
    private readonly PartitionMappingGroupModelRepository: Repository<PartitionMappingGroupModel>,

    @InjectRepository(MenuMappingRoleModel)
    private readonly MenuMappingRoleModelRepository: Repository<MenuMappingRoleModel>,

    @InjectRepository(RoleMappingPermissionModel)
    private readonly RoleMappingPermissionsModelRepository: Repository<RoleMappingPermissionModel>,

    @InjectRepository(UserMappingPartitionModel)
    private readonly UserMappingPartitionModelRepository: Repository<UserMappingPartitionModel>,

    @InjectRepository(UserMappingGroupModel)
    private readonly UserMappingGroupModelRepository: Repository<UserMappingGroupModel>,

    @InjectRepository(UserMappingRoleModel)
    private readonly UserMappingRoleModelRepository: Repository<UserMappingRoleModel>,

    @InjectRepository(UserMappingCompanyModel)
    private readonly UserMappingCompanyModelRepository: Repository<UserMappingCompanyModel>,

    private readonly companyManagementService: CompanyManagementService,
  ) {}

  async createPartition(
    createPartitionDto: CreatePartitionDto,
    user: UserModel,
  ) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { partition_name, partition_description, model_name, sql_append } =
      createPartitionDto;
    const model = new PartitionModel();
    model.partition_name = partition_name;
    model.partition_description = partition_description;
    model.model_name = model_name;
    model.sql_append = sql_append;
    model.createdBy = user.id;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async updatePartition(id: number, updatePartitionDto: UpdatePartitionDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { partition_name, partition_description, model_name, sql_append } =
      updatePartitionDto;

    await stateRunner.manager.update(PartitionModel, id, {
      partition_name: partition_name,
      partition_description: partition_description,
      model_name: model_name,
      sql_append: sql_append,
    });
    await stateRunner.cleanup();
  }

  async createPartitionMappingGroup(options: any) {
    try {
      const { group_id, partition_id } = options;
      for (let i = 0; i < partition_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new PartitionMappingGroupModel();
        const partition = await this.findAllPartition();

        for (let j = 0; j < partition.length; j++) {
          if (partition_id[i] == partition[j].id) {
            model.partition_id = partition_id[i];
            model.group_id = group_id;
            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { group_name, group_description, default_role, partition_id } =
      createGroupDto;
    const model = new GroupModel();
    model.group_name = group_name;
    model.group_description = group_description;
    model.default_role = default_role;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    const group_id = model.id;
    const options = {
      group_id,
      partition_id,
    };
    if (partition_id) {
      await this.createPartitionMappingGroup(options);
    }
  }

  async updateGroup(id: number, updateGroupDto: UpdateGroupDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { group_name, group_description, default_role, partition_id } =
      updateGroupDto;
    await stateRunner.manager.update(GroupModel, id, {
      group_name: group_name,
      group_description: group_description,
      default_role: default_role,
    });
    await stateRunner.cleanup();

    const model = await this.findOneGroup(id);
    const group_id = model.id;

    const options = {
      group_id,
      partition_id,
    };

    const PartitionMappingGroups =
      await this.PartitionMappingGroupModelRepository.find({
        where: {
          group_id: group_id,
        },
        relations: ['Group', 'Partition'],
      });
    for (let i = 0; i < PartitionMappingGroups.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      PartitionMappingGroups[i].apply(
        PartitionMappingGroupTransition.DELETE,
        stateRunner,
      );
      await PartitionMappingGroups[i].saveState();
      await stateRunner.cleanup();
    }

    if (partition_id) {
      await this.createPartitionMappingGroup(options);
    }
  }

  async createResource(createResourceDto: CreateResourceDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { resource_code, resource_name, resource_type } = createResourceDto;
    const model = new ResourceModel();
    model.resource_code = resource_code;
    model.resource_name = resource_name;
    model.resource_type = resource_type;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async updateResource(id: number, updateResourceDto: UpdateResourceDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { resource_code, resource_name, resource_type } = updateResourceDto;
    const model = await this.findOneResource(id);
    model.resource_code = resource_code;
    model.resource_name = resource_name;
    model.resource_type = resource_type;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { role_name, role_description, resource_id, permission_id } =
      createRoleDto;
    const model = new RoleModel();
    model.role_name = role_name;
    model.role_description = role_description;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    const role_id = model.id;
    const options = {
      role_id,
      resource_id,
      permission_id,
    };

    if (resource_id) {
      await this.createMenuMappingRole(options);
    }

    if (permission_id) {
      await this.createRoleMappingPermission(options);
    }
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { role_name, role_description, resource_id, permission_id } =
      updateRoleDto;
    const model = await this.findOneRole(id);
    model.role_name = role_name;
    model.role_description = role_description;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    const role_id = model.id;
    const options = {
      role_id,
      resource_id,
      permission_id,
    };

    const MenuMappingRoles = await this.MenuMappingRoleModelRepository.find({
      where: {
        role_id: role_id,
      },
      relations: ['Resource', 'Role'],
    });
    for (let i = 0; i < MenuMappingRoles.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      MenuMappingRoles[i].apply(MenuMappingRoleTransition.DELETE, stateRunner);
      await MenuMappingRoles[i].saveState();
      await stateRunner.cleanup();
    }

    const RoleMappingPermissions =
      await this.RoleMappingPermissionsModelRepository.find({
        where: {
          role_id: role_id,
        },
        relations: ['Permission', 'Role'],
      });
    for (let i = 0; i < RoleMappingPermissions.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      RoleMappingPermissions[i].apply(
        RoleMappingPermissionTransition.DELETE,
        stateRunner,
      );
      await RoleMappingPermissions[i].saveState();
      await stateRunner.cleanup();
    }

    if (resource_id) {
      await this.createMenuMappingRole(options);
    }

    if (permission_id) {
      await this.createRoleMappingPermission(options);
    }
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const { permission_name, permission, resource_id } = createPermissionDto;

      const model = new PermissionModel();
      model.permission_name = permission_name;
      model.permission = permission;
      const resource = await this.findAllResourceEntity();
      for (let i = 0; i < resource.length; i++) {
        if (resource_id == resource[i].id) {
          model.resource_id = resource_id;
          await stateRunner.manager.save(model);
          await stateRunner.cleanup();
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const { permission_name, permission, resource_id } = updatePermissionDto;

      const resource = await this.findAllResourceEntity();
      for (let i = 0; i < resource.length; i++) {
        if (resource_id == resource[i].id) {
          await stateRunner.manager.update(PermissionModel, id, {
            permission_name: permission_name,
            permission: permission,
            resource_id: resource_id,
          });
          await stateRunner.cleanup();
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      is_system,
      username,
      email,
      password,
      role_id,
      partition_id,
      group_id,
      company_id,
    } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const model = new UserModel();
    model.is_system = is_system;
    model.username = username;
    model.email = email;
    model.password = password;
    try {
      await stateRunner.manager.save(model);
      await stateRunner.cleanup();
      const user_id = model.id;
      const options = {
        user_id,
        role_id,
        partition_id,
        group_id,
        company_id,
      };

      if (partition_id) {
        await this.createUserMappingPartition(options);
      }
      if (group_id) {
        await this.createUserMappingGroup(options);
      }
      if (role_id) {
        await this.createUserMappingRole(options);
      }
      if (company_id) {
        await this.createUserMappingCompany(options);
      }
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // duplicate username
        throw new ConflictException('Username Or Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      is_system,
      username,
      email,
      password,
      role_id,
      partition_id,
      group_id,
      company_id,
    } = updateUserDto;
    const model = await this.findOneUser(id);
    await stateRunner.manager.update(UserModel, id, {
      is_system: is_system,
      username: username,
      email: email,
      password: password,
    });

    await stateRunner.cleanup();
    const user_id = model.id;
    const options = {
      user_id,
      role_id,
      partition_id,
      group_id,
      company_id,
    };

    const UserMappingPartitions =
      await this.UserMappingPartitionModelRepository.find({
        where: {
          user_id: user_id,
        },
        relations: ['User', 'Partition'],
      });
    for (let i = 0; i < UserMappingPartitions.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      UserMappingPartitions[i].apply(
        UserMappingPartitionTransition.DELETE,
        stateRunner,
      );
      await UserMappingPartitions[i].saveState();
      await stateRunner.cleanup();
    }

    if (partition_id) {
      await this.createUserMappingPartition(options);
    }

    const UserMappingGroups = await this.UserMappingGroupModelRepository.find({
      where: {
        user_id: user_id,
      },
      relations: ['User', 'Group'],
    });
    for (let i = 0; i < UserMappingGroups.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      UserMappingGroups[i].apply(
        UserMappingGroupTransition.DELETE,
        stateRunner,
      );
      await UserMappingGroups[i].saveState();
      await stateRunner.cleanup();
    }

    if (group_id) {
      await this.createUserMappingGroup(options);
    }

    const UserMappingRoles = await this.UserMappingRoleModelRepository.find({
      where: {
        user_id: user_id,
      },
      relations: ['User', 'Role'],
    });
    for (let i = 0; i < UserMappingRoles.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      UserMappingRoles[i].apply(UserMappingRoleTransition.DELETE, stateRunner);
      await UserMappingRoles[i].saveState();
      await stateRunner.cleanup();
    }

    if (role_id) {
      await this.createUserMappingRole(options);
    }

    const UserMappingCompanies =
      await this.UserMappingCompanyModelRepository.find({
        where: {
          user_id: user_id,
        },
        relations: ['User', 'Company'],
      });
    for (let i = 0; i < UserMappingCompanies.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      UserMappingCompanies[i].apply(
        UserMappingCompanyTransition.DELETE,
        stateRunner,
      );
      await UserMappingCompanies[i].saveState();
      await stateRunner.cleanup();
    }

    if (company_id) {
      await this.createUserMappingCompany(options);
    }
  }

  async createUserMappingPartition(options: any) {
    try {
      const { partition_id, user_id } = options;
      for (let i = 0; i < partition_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new UserMappingPartitionModel();
        const partition = await this.findAllPartition();

        for (let j = 0; j < partition.length; j++) {
          if (partition_id[i] == partition[j].id) {
            model.partition_id = partition_id[i];
            model.user_id = user_id;
            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createUserMappingGroup(options: any) {
    try {
      const { group_id, user_id } = options;
      for (let i = 0; i < group_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new UserMappingGroupModel();
        const group = await this.findAllGroup();

        for (let j = 0; j < group.length; j++) {
          if (group_id[i] == group[j].id) {
            model.group_id = group_id[i];
            model.user_id = user_id;
            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createUserMappingRole(options: any) {
    try {
      const { role_id, user_id } = options;
      for (let i = 0; i < role_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new UserMappingRoleModel();
        const role = await this.findAllRoleActive();
        for (let j = 0; j < role.length; j++) {
          if (role_id[i] == role[j].id) {
            model.role_id = role_id[i];
            model.user_id = user_id;

            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createUserMappingCompany(options: any) {
    try {
      const { company_id, user_id } = options;
      for (let i = 0; i < company_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new UserMappingCompanyModel();
        const company =
          await this.companyManagementService.findAllCompanyActive();
        for (let j = 0; j < company.length; j++) {
          if (company_id[i] == company[j].id) {
            model.company_id = company_id[i];
            model.user_id = user_id;

            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createRoleMappingPermission(options: any) {
    try {
      const { role_id, permission_id } = options;
      for (let i = 0; i < permission_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new RoleMappingPermissionModel();
        const permission = await this.findAllPermission();

        for (let j = 0; j < permission.length; j++) {
          if (permission_id[i] == permission[j].id) {
            model.permission_id = permission_id[i];
            model.role_id = role_id;
            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createMenuMappingRole(options: any) {
    try {
      const { resource_id, role_id } = options;
      for (let i = 0; i < resource_id.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new MenuMappingRoleModel();
        const resource = await this.findAllResource();

        for (let j = 0; j < resource.length; j++) {
          if (resource_id[i] == resource[j].id) {
            model.resource_id = resource_id[i];
            model.role_id = role_id;
            await stateRunner.manager.save(model);
            await stateRunner.cleanup();
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  async findAllPartition() {
    const model = await this.PartitionModelRepository.find({
      relations: ['PartitionMappingGroups', 'UserMappingPartitions'],
    });
    return model;
  }

  async findAllPartitionActive() {
    const model = await this.PartitionModelRepository.find({
      where: { state: 'active' },
      relations: ['PartitionMappingGroups', 'UserMappingPartitions'],
    });
    return model;
  }

  async findOnePartition(id: number) {
    const model = await this.PartitionModelRepository.findOne(id, {
      relations: ['PartitionMappingGroups', 'UserMappingPartitions'],
    });
    return model;
  }

  async findAllGroup() {
    const model = await this.GroupModelRepository.find({
      relations: ['PartitionMappingGroups', 'UserMappingGroups'],
    });
    return model;
  }

  async findAllGroupActive() {
    const model = await this.GroupModelRepository.find({
      where: { state: 'active' },
      relations: ['PartitionMappingGroups', 'UserMappingGroups'],
    });
    return model;
  }

  async findOneGroup(id: number) {
    const model = await this.GroupModelRepository.findOne(id, {
      relations: [
        'PartitionMappingGroups',
        'UserMappingGroups',
        'PartitionMappingGroups.Partition',
      ],
    });
    return model;
  }

  async findAllResource() {
    const model = await this.ResourceModelRepository.find({
      relations: [
        'Permissions',
        'MenuMappingRoles',
        'Permissions.RoleMappingPermissions',
      ],
    });
    return model;
  }

  async findAllResourceActive() {
    const model = await this.ResourceModelRepository.find({
      where: { state: 'active' },
      relations: [
        'Permissions',
        'MenuMappingRoles',
        'Permissions.RoleMappingPermissions',
      ],
    });
    return model;
  }

  async findOneResource(id: number) {
    const model = await this.ResourceModelRepository.findOne(id, {
      relations: [
        'Permissions',
        'MenuMappingRoles',
        'Permissions.RoleMappingPermissions',
      ],
    });
    return model;
  }

  async findAllResourceMenu() {
    const model = await this.ResourceModelRepository.find({
      where: { state: 'active', resource_type: 'MENU' },
      relations: [
        'Permissions',
        'MenuMappingRoles',
        'Permissions.RoleMappingPermissions',
      ],
    });
    return model;
  }

  async findAllResourceEntity() {
    const model = await this.ResourceModelRepository.find({
      where: { state: 'active', resource_type: 'ENTITY' },
      relations: [
        'Permissions',
        'MenuMappingRoles',
        'Permissions.RoleMappingPermissions',
      ],
    });
    return model;
  }

  async findAllRole() {
    const model = await this.RoleModelRepository.find({
      relations: [
        'RoleMappingPermissions',
        'RoleMappingPermissions.Permission',
        'MenuMappingRoles',
        'MenuMappingRoles.Resource',
      ],
    });

    return model;
  }

  async findAllRoleActive() {
    const model = await this.RoleModelRepository.find({
      relations: ['RoleMappingPermissions'],
    });

    return model;
  }

  async findOneRole(id: number) {
    const model = await this.RoleModelRepository.findOne(id, {
      relations: [
        'RoleMappingPermissions',
        'RoleMappingPermissions.Permission',
        'MenuMappingRoles',
        'MenuMappingRoles.Resource',
        'UserMappingRoles',
      ],
    });
    return model;
  }

  async findAllPermission() {
    const model = await this.PermissionModelRepository.find({
      relations: ['RoleMappingPermissions', 'Resource'],
    });

    return model;
  }

  async findAllPermissionActive() {
    const model = await this.PermissionModelRepository.find({
      where: { state: 'active' },
      relations: ['RoleMappingPermissions', 'Resource'],
    });

    return model;
  }

  async findOnePermission(id: number) {
    const model = await this.PermissionModelRepository.findOne(id, {
      relations: ['RoleMappingPermissions', 'Resource'],
    });
    return model;
  }

  async findAllUser() {
    const model = await this.UserModelRepository.find({
      relations: [
        'UserMappingPartitions',
        'UserMappingGroups',
        'UserMappingRoles',
        'UserMappingCompanies',
        'Contacts',
      ],
    });
    return model;
  }

  async findAllUser_ServerSide(request: any, resultsCallback: any) {
    const serverSide = new ServerSideRender();
    const table = 'tb_user';
    return serverSide.GetData(request, resultsCallback, table);
  }

  async findOneUser(id: number) {
    const model = await this.UserModelRepository.findOne(id, {
      relations: [
        'UserMappingPartitions',
        'UserMappingGroups',
        'UserMappingRoles',
        'UserMappingPartitions.Partition',
        'UserMappingGroups.Group',
        'UserMappingRoles.Role',
        'UserMappingCompanies',
        'Contacts',
      ],
    });
    return model;
  }

  async updateStatePartitionActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.PartitionModelRepository.findOne(id);

      model.apply(PartitionTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateGroupActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.GroupModelRepository.findOne(id);

      model.apply(GroupTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateResourceActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ResourceModelRepository.findOne(id);

      model.apply(ResourceTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateRoleActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.RoleModelRepository.findOne(id);

      model.apply(RoleTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStatePermissionActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.PermissionModelRepository.findOne(id);

      model.apply(PermissionTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateUserActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.UserModelRepository.findOne(id);
      if (model.state == 'start') {
        model.apply(UserTransition.NEW, stateRunner);
      } else if (model.state == 'inactive') {
        model.apply(UserTransition.ACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateUserInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.UserModelRepository.findOne(id);
      model.apply(UserTransition.INACTIVE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removePartition(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.PartitionModelRepository.findOne(id, {
        relations: ['PartitionMappingGroups', 'UserMappingPartitions'],
      });

      model.apply(PartitionTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeGroup(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.GroupModelRepository.findOne(id, {
        relations: ['PartitionMappingGroups', 'UserMappingGroups'],
      });

      model.apply(GroupTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeResource(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ResourceModelRepository.findOne(id, {
        relations: [
          'Permissions',
          'Permissions.RoleMappingPermissions',
          'MenuMappingRoles',
        ],
      });

      model.apply(ResourceTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeRole(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.RoleModelRepository.findOne(id, {
        relations: [
          'RoleMappingPermissions',
          'MenuMappingRoles',
          'UserMappingRoles',
        ],
      });

      model.apply(RoleTransition.DELETE, stateRunner);
      await model.saveState({ role_description: 'Delete' });
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removePermission(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.PermissionModelRepository.findOne(id, {
        relations: ['RoleMappingPermissions', 'Resource'],
      });

      model.apply(PermissionTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeUser(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.UserModelRepository.findOne(id, {
        relations: [
          'UserMappingPartitions',
          'UserMappingGroups',
          'UserMappingRoles',
          'UserMappingPartitions.Partition',
          'UserMappingGroups.Group',
          'UserMappingRoles.Role',
          'UserMappingCompanies',
        ],
      });

      model.apply(UserTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }
}
