import { PartialType } from '@nestjs/swagger';
import { CreateWipFlowDto } from './create-wipFlow.dto';

export class UpdateWipFlowDto extends PartialType(CreateWipFlowDto) {}
