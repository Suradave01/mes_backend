import { PartialType } from '@nestjs/swagger';
import { CreateWorkOrderDto } from './create-workOrder.dto';

export class UpdateWorkOrderDto extends PartialType(CreateWorkOrderDto) {}
