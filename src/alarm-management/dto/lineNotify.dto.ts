import { ApiProperty } from '@nestjs/swagger';

export class LineNotifyDto {
  @ApiProperty({ type: 'string' })
  message: string;
  imageThumbnail?: string;
  imageFullsize?: string;
  imageFile?: unknown;
  stickerPackageId?: number;
  stickerId?: number;
  notificationDisabled?: boolean;
}
