import { ApiProperty } from '@nestjs/swagger';
export class CreateContactMappingChannelDto {
  @ApiProperty({ type: 'number', format: '' })
  contact_id: number[];
  @ApiProperty({ type: 'string', format: '' })
  value?: string;
  @ApiProperty({ type: 'number', format: '' })
  channel_id?: number;
  @ApiProperty({ type: 'boolean', format: '' })
  _primary?: boolean;
}
