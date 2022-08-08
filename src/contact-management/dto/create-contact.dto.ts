import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ type: 'string', format: '' })
  contact_name: string;
  @ApiProperty({ type: 'string', format: '' })
  contact_lastName?: string;
  @ApiProperty({ type: 'number', format: 'float' })
  create_by: number;
  @ApiProperty({ type: 'number', format: 'float' })
  company_id: number;
  @ApiProperty({ type: 'string', format: '' })
  address?: string;
  @ApiProperty({ type: 'string', format: '' })
  telephone_no?: string;
  @ApiProperty({ type: 'string', format: '' })
  line_token?: string;
}
