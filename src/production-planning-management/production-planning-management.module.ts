import { Module } from '@nestjs/common';
import { ProductionPlanningManagementService } from './production-planning-management.service';
import { ProductionPlanningManagementController } from './production-planning-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ImportModel,
  CompanyModel,
  CustomerModel,
  ImportDataModel,
} from 'src/company-management/entities';
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
import {
  WipFlowMappingModel,
  WipFlowModel,
  WipModel,
  WorkOrderItemModel,
  WorkOrderModel,
} from './entities';
import { CompanyManagementModule } from 'src/company-management/company-management.module';
import { AssetModel } from 'src/asset-management/entities';
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
      ImportModel,
      ImportDataModel,
      CompanyModel,
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
    CompanyManagementModule,
    AuthenticationModule,
  ],
  controllers: [ProductionPlanningManagementController],
  providers: [ProductionPlanningManagementService],
  exports: [ProductionPlanningManagementService],
})
export class ProductionPlanningManagementModule {}
