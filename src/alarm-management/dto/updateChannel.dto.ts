import { PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './createChannet.dto';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {}
