import { ApiProperty } from '@nestjs/swagger';

export class CreateImportDataDto {
  @ApiProperty({ type: 'string', format: 'string' })
  file_name: string;

  import_by?: string;

  company_id?: number;

  user_id?: number;
}
