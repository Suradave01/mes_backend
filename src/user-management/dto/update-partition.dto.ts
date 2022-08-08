import { PartialType } from '@nestjs/swagger';
import { CreatePartitionDto } from './create-partition.dto';

export class UpdatePartitionDto extends PartialType(CreatePartitionDto) {}
