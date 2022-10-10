import { ApiProperty } from '@nestjs/swagger';

export class ViewCameraManagementDto {
  @ApiProperty({ type: 'string', description: 'rtsp' })
  rtsp: string;
}
