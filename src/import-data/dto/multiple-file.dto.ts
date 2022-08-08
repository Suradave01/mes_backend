import { ApiProperty } from '@nestjs/swagger';

// you can add validate using class-validator
export class MultipleFileDto {
  @ApiProperty({ type: Array, format: 'binary' })
  file_import: string[];
}
