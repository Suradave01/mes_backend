import { ApiProperty } from '@nestjs/swagger';

export class CreateTriggerDto {
  @ApiProperty({ type: 'string' })
  trigger_name: string;
  @ApiProperty({ type: 'number' })
  asset_id: number;
  @ApiProperty({ type: 'number' })
  channel_id: number;
  @ApiProperty({ type: 'number' })
  value: number;
  @ApiProperty({ type: 'number' })
  condition_type_id: number;
  @ApiProperty({ type: 'number' })
  device_field_id: number;
  @ApiProperty({ type: 'string' })
  type: TYPE_TRIGGER;
}

export enum TYPE_TRIGGER {
  WARNING = 'WARNING',
  INFO = 'INFO',
}
