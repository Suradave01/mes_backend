import { ApiProperty } from '@nestjs/swagger';

export class UpdateCameraManagementDto {
  @ApiProperty({ type: 'string', description: 'camera_name' })
  camera_name: string;
  @ApiProperty({ type: 'string', description: 'ip_address' })
  ip_address: string;
  @ApiProperty({ type: 'string', description: 'position' })
  position: string;
}
