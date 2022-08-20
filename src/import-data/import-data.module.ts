import { Module } from '@nestjs/common';
import { ImportDataService } from './import-data.service';
import { ImportDataController } from './import-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyManagementModule } from 'src/company-management/company-management.module';
import { ImportDataModel, ImportModel } from 'src/company-management/entities';
import { ProductionPlanningManagementModule } from '../production-planning-management/production-planning-management.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImportModel, ImportDataModel]),
    CompanyManagementModule,
    ProductionPlanningManagementModule,
    AuthenticationModule,
  ],
  controllers: [ImportDataController],
  providers: [ImportDataService],
})
export class ImportDataModule {}
