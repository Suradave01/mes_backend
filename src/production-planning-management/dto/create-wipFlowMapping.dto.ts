import { ApiProperty } from '@nestjs/swagger';

export class CreateWipFlowMappingDto {
  @ApiProperty({ type: 'number' })
  wip_flow_id: number;
  @ApiProperty({ type: 'number' })
  wip_id: number;
  @ApiProperty({ type: 'number' })
  wip_sequence: number;
}
