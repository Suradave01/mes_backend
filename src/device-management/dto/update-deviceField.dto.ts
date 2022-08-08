import { PartialType } from '@nestjs/swagger';
import { CreateDeviceFieldDto } from './create-deviceField.dto';

export class UpdateDeviceFieldDto extends PartialType(CreateDeviceFieldDto) {}
