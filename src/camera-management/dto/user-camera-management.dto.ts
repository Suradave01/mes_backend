import { ApiProperty } from '@nestjs/swagger';

export class UserCameraManagementDto {
  @ApiProperty({ type: 'string', description: 'user' })
  user: string;
  @ApiProperty({ type: 'string', description: 'pass' })
  pass: string;
}
