/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: 'boolean' })
  is_system: boolean;
  @ApiProperty({ type: 'string' })
  username: string;
  @ApiProperty({ type: 'string' })
  email: string;
  @ApiProperty({ type: 'string' })
  password: string;
  @ApiProperty({ type: 'number' })
  role_id: number[];
  @ApiProperty({ type: 'number' })
  group_id: number[];
  @ApiProperty({ type: 'number' })
  partition_id: number[];
  @ApiProperty({ type: 'number' })
  company_id: number[];
}
