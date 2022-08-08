import { Module } from '@nestjs/common';
import { CameraManagementService } from './camera-management.service';
import { CameraManagementController } from './camera-management.controller';
import { CameraModel } from './entities/camera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CameraModel])],
  controllers: [CameraManagementController],
  providers: [CameraManagementService],
})
export class CameraManagementModule {}
