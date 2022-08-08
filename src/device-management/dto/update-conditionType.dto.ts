import { PartialType } from '@nestjs/swagger';
import { CreateConditionTypeDto } from './create-conditionType.dto';

export class UpdateConditionTypeDto extends PartialType(
  CreateConditionTypeDto,
) {}
