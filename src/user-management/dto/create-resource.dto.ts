/* eslint-disable prettier/prettier */
import { ResourceType } from '../enum/resource.enum';

export class CreateResourceDto {
  resource_code: string;
  resource_name: string;
  resource_type: ResourceType;
}
