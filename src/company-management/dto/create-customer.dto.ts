import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ type: 'string', format: 'string', example: 'มาม่า' })
  name: string;
  @ApiProperty({ type: 'string', format: 'string', example: 'ม001' })
  customer_no: string;
  @ApiProperty({ type: 'number', format: 'number', example: '001' })
  import_id?: number;
  @ApiProperty({ type: 'number', format: 'number', example: '1' })
  company_id?: number;
  @ApiProperty({ type: 'string', format: 'string', example: '' })
  md5_dataVersion?: string;
  @ApiProperty({ type: 'string', format: 'string', example: '' })
  raw_data?: any;
}
