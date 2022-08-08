import { Module } from '@nestjs/common';
import { CompanyManagementService } from './company-management.service';
import { CompanyManagementController } from './company-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModel } from 'src/contact-management/entities';
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
import { ImportModel, CompanyModel, CustomerModel } from './entities';

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
      CustomerModel,
      ContactModel,
    ]),
  ],
  controllers: [CompanyManagementController],
  providers: [CompanyManagementService],
  exports: [CompanyManagementService],
})
export class CompanyManagementModule {}
