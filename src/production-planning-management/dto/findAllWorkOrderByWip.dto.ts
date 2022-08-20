import { ApiProperty } from '@nestjs/swagger';

export class FindAllWorkOrderByWipDto {
  @ApiProperty({
    type: 'string',
    default: '2022-08-11',
  })
  date?: string;
  @ApiProperty({ type: 'string', default: 'created_at/date_ex' })
  condition?: string;
}
