import { Module } from '@nestjs/common';
import { ContactManagementService } from './contact-management.service';
import { ContactManagementController } from './contact-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ImportModel,
  CompanyModel,
  CustomerModel,
} from 'src/company-management/entities';
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
import { ContactModel, ContactMappingChannelModel } from './entities';
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
      CustomerModel,
      ContactModel,
      ContactMappingChannelModel,
    ]),
    AuthenticationModule,
  ],
  controllers: [ContactManagementController],
  providers: [ContactManagementService],
})
export class ContactManagementModule {}
