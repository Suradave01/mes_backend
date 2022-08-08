/* eslint-disable prettier/prettier */

export class CreateGroupDto {
  group_name: string;
  group_description: string;
  default_role: number;
  partition_id: number[];
}
