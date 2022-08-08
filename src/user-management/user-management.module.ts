import { AuthenticationModule } from './../authentication/authentication.module';
/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from './entities/role.entity';
import { PermissionModel } from './entities/permission.entity';
import { RoleMappingPermissionModel } from './entities/role_mapping_permission.entity';
import { ResourceModel } from './entities/resource.entity';
import { PartitionModel } from './entities/partition.entity';
import { GroupModel } from './entities/group.entity';
import { UserMappingRoleModel } from './entities/user_mapping_role.entity';
import { UserModel } from './entities/user.entity';
import { ImportModel } from 'src/company-management/entities/import.entity';
import { CompanyModel } from 'src/company-management/entities/company.entity';
import { CustomerModel } from 'src/company-management/entities/customer.entity';
import { CompanyManagementModule } from 'src/company-management/company-management.module';
import { CompanyManagementService } from 'src/company-management/company-management.service';
import { PartitionMappingGroupModel } from './entities/partition_mapping_group.entity';
import { MenuMappingRoleModel } from './entities/menu_mapping_role.entity';
import { UserMappingPartitionModel } from './entities/user_mapping_partition.entity';
import { UserMappingGroupModel } from './entities/user_mapping_group.entity';
import { UserMappingCompanyModel } from './entities';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleModel,
      PermissionModel,
      RoleMappingPermissionModel,
      ResourceModel,
      PartitionModel,
      GroupModel,
      ImportModel,
      CompanyModel,
      CustomerModel,
      PartitionMappingGroupModel,
      MenuMappingRoleModel,
      UserModel,
      UserMappingPartitionModel,
      UserMappingRoleModel,
      UserMappingCompanyModel,
      UserMappingGroupModel,
    ]),
    CompanyManagementModule,
    AuthenticationModule,
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
