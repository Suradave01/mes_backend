import { Module } from '@nestjs/common';
import { DeviceManagementService } from './device-management.service';
import { DeviceManagementController } from './device-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyManagementModule } from 'src/company-management/company-management.module';

import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AssetModel,
  AssetMappingDeviceModel,
  DeviceModel,
  TriggerModel,
  DeviceFieldModel,
  ConditionTypeModel,
} from 'src/asset-management/entities';
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
      DeviceFieldModel,
      ConditionTypeModel,
    ]),
    AuthenticationModule,
    CompanyManagementModule,
    ClientsModule.register([
      {
        name: 'MQTT_PUBSUB',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://broker.hivemq.com:1883',
        },
      },
    ]),
  ],
  controllers: [DeviceManagementController],
  providers: [DeviceManagementService],
  exports: [DeviceManagementService],
})
export class DeviceManagementModule {}
