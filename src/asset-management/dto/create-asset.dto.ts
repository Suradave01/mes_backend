import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ type: 'string' })
  asset_name: string;
  @ApiProperty({ type: 'string' })
  description: string;
  // @ApiProperty({ type: 'string' })
  // asset_status: string;
  @ApiProperty({ type: 'number' })
  company_id: number;
  @ApiProperty({ type: 'number' })
  wip_id: number;
  @ApiProperty({ type: 'number' })
  device_id: number[];
}
