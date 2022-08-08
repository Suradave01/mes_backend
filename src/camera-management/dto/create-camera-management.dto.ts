import { ApiProperty } from '@nestjs/swagger';

export class CreateCameraManagementDto {
  @ApiProperty({ type: 'string', description: 'camera_name' })
  camera_name: string;
  @ApiProperty({ type: 'string', description: 'ip_address' })
  ip_address: string;
  @ApiProperty({ type: 'string', description: 'position' })
  position: string;
  @ApiProperty({ type: 'string', description: 'user' })
  user?: string;
  @ApiProperty({ type: 'string', description: 'pass' })
  pass?: string;
}
