import { PartialType } from '@nestjs/swagger';
import { CreateWipFlowMappingDto } from './create-wipFlowMapping.dto';

export class UpdateWipFlowMappingDto extends PartialType(
  CreateWipFlowMappingDto,
) {}
