import { Module } from '@nestjs/common';
import { AlarmManagementService } from './alarm-management.service';
import { AlarmManagementController } from './alarm-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CompanyModel,
  CustomerModel,
  ImportDataModel,
  ImportModel,
} from 'src/company-management/entities';
import { ContactModel } from 'src/contact-management/entities';
import { ChannelModel } from './entities';
import { AssetModel } from 'src/asset-management/entities';
import {
  WipModel,
  WipFlowModel,
  WipFlowMappingModel,
  WorkOrderItemModel,
  WorkOrderModel,
} from 'src/production-planning-management/entities';
import {
  RoleModel,
  PermissionModel,
  RoleMappingPermissionModel,
  ResourceModel,
  PartitionModel,
  GroupModel,
  PartitionMappingGroupModel,
  MenuMappingRoleModel,
  UserModel,
  UserMappingPartitionModel,
  UserMappingRoleModel,
  UserMappingCompanyModel,
  UserMappingGroupModel,
} from 'src/user-management/entities';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContactModel,
      CompanyModel,
      ChannelModel,
      RoleModel,
      PermissionModel,
      RoleMappingPermissionModel,
      ResourceModel,
      PartitionModel,
      GroupModel,
      ImportModel,
      ImportDataModel,
      CustomerModel,
      PartitionMappingGroupModel,
      MenuMappingRoleModel,
      UserModel,
      UserMappingPartitionModel,
      UserMappingRoleModel,
      UserMappingCompanyModel,
      UserMappingGroupModel,
      WipModel,
      WipFlowModel,
      WipFlowMappingModel,
      WorkOrderItemModel,
      WorkOrderModel,
      AssetModel,
    ]),
    AuthenticationModule,
  ],
  controllers: [AlarmManagementController],
  providers: [AlarmManagementService],
})
export class AlarmManagementModule {}
