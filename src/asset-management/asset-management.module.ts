import { Module } from '@nestjs/common';
import { AssetManagementService } from './asset-management.service';
import { AssetManagementController } from './asset-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyManagementModule } from 'src/company-management/company-management.module';
import { DeviceManagementModule } from 'src/device-management/device-management.module';
import {
  ImportModel,
  CompanyModel,
  CustomerModel,
} from 'src/company-management/entities';

import {
  AssetModel,
  AssetMappingDeviceModel,
  DeviceModel,
  TriggerModel,
} from './entities';
import {
  RoleModel,
  PermissionModel,
  RoleMappingPermissionModel,
  ResourceModel,
  PartitionModel,
  GroupModel,
  UserMappingRoleModel,
  UserModel,
  UserMappingCompanyModel,
} from 'src/user-management/entities';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleModel,
      PermissionModel,
      RoleMappingPermissionModel,
      ResourceModel,
      PartitionModel,
      GroupModel,
      UserMappingRoleModel,
      UserModel,
      ImportModel,
      CompanyModel,
      CustomerModel,
      UserMappingCompanyModel,
      AssetModel,
      AssetMappingDeviceModel,
      DeviceModel,
      TriggerModel,
    ]),
    CompanyManagementModule,
    DeviceManagementModule,
    AuthenticationModule,
  ],
  controllers: [AssetManagementController],
  providers: [AssetManagementService],
  exports: [AssetManagementService],
})
export class AssetManagementModule {}
