import { ApiProperty } from '@nestjs/swagger';
export class CreateContactMappingChannelDto {
  @ApiProperty({ type: 'number', format: '' })
  wip_flow_id: number;
  @ApiProperty({ type: 'number', format: '' })
  channel_id: number;
}
