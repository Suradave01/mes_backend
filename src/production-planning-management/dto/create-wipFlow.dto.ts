import { ApiProperty } from '@nestjs/swagger';

export class CreateWipFlowDto {
  @ApiProperty({ type: 'number' })
  production_id?: number;
  @ApiProperty({ type: 'number' })
  ref_wip_flow_id?: number;
  @ApiProperty({ type: 'number' })
  company_id?: number;
  @ApiProperty({
    type: 'string',
    default: 'ลูกฟูก > สลิตเตอร์ > ปริ้นติ้ง > ไดคัท',
  })
  wip_flow_name: string;
  @ApiProperty({ type: 'string' })
  description?: string;
  @ApiProperty({ type: 'string' })
  presentation_template?: string;
  @ApiProperty({ type: 'boolean' })
  is_template?: boolean;
  @ApiProperty({ type: 'number', default: '[6,7,8,9]' })
  wip_id_map?: number[];
}
