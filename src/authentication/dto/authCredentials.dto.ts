import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ type: 'string' })
  username?: string;

  @ApiProperty({ type: 'string' })
  email?: string;

  @ApiProperty({ type: 'string' })
  password: string;
}
