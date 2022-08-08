import { ApiProperty } from '@nestjs/swagger';

export class ProcessImportDataPlanningDto {
  @ApiProperty({ type: 'number', format: 'number' })
  ref_wip_flow_id: number;
}
