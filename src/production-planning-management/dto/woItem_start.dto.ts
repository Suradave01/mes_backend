import { ApiProperty } from '@nestjs/swagger';

export class WoItemStart {
  @ApiProperty({ type: 'string' })
  asset_name?: string;
  @ApiProperty({ type: 'string' })
  note?: string;
  @ApiProperty({ type: 'number' })
  wo_item_id?: number[];
  @ApiProperty({ type: 'number' })
  wip_flow_mapping_id: number;
  @ApiProperty({ type: 'number' })
  finish_good_emp?: number;
  @ApiProperty({ type: 'number' })
  finish_good_asset?: number;
  @ApiProperty({ type: 'number' })
  fail_good_emp?: number;
  @ApiProperty({ type: 'number' })
  fail_good_asset?: number;
}
