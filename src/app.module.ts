/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { CompanyManagementModule } from './company-management/company-management.module';
import { AssetManagementModule } from './asset-management/asset-management.module';
import { DeviceManagementModule } from './device-management/device-management.module';
import { ProductionPlanningManagementModule } from './production-planning-management/production-planning-management.module';
import { ImportDataModule } from './import-data/import-data.module';
import { ContactManagementModule } from './contact-management/contact-management.module';
import { AlarmManagementModule } from './alarm-management/alarm-management.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CameraManagementModule } from './camera-management/camera-management.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserManagementModule,
    CompanyManagementModule,
    AssetManagementModule,
    DeviceManagementModule,
    ProductionPlanningManagementModule,
    ImportDataModule,
    ContactManagementModule,
    AlarmManagementModule,
    AuthenticationModule,
    CameraManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
