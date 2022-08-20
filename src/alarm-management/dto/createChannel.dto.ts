import { ApiProperty } from '@nestjs/swagger';
export class CreateChannelDto {
  @ApiProperty({ type: 'string', format: '' })
  channel_name: string;
  @ApiProperty({ type: 'string', format: '' })
  description: string;
  @ApiProperty({ type: 'number', format: '' })
  create_by?: number;
  @ApiProperty({ type: 'string', format: '' })
  type: ChannelType;
  @ApiProperty({ type: 'string', format: '' })
  template_id?: number;
}

export enum ChannelType {
  LINE = 'LINE',
  EMAIL = 'EMAIL',
}
