import { Module } from '@nestjs/common';
import { AlarmManagementService } from './alarm-management.service';
import { AlarmManagementController } from './alarm-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModel } from 'src/company-management/entities';
import { ContactModel } from 'src/contact-management/entities';
import { ChannelModel } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactModel, CompanyModel, ChannelModel]),
  ],
  controllers: [AlarmManagementController],
  providers: [AlarmManagementService],
})
export class AlarmManagementModule {}
