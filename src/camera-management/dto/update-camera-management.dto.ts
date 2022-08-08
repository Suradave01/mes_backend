import { PartialType } from '@nestjs/swagger';
import { CreateCameraManagementDto } from './create-camera-management.dto';

export class UpdateCameraManagementDto extends PartialType(CreateCameraManagementDto) {}
