import { PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './createChannel.dto';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {}
