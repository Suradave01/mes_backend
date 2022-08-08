/* eslint-disable prettier/prettier */

export class CreatePartitionDto {
  partition_name: string;
  partition_description?: string;
  model_name?: string;
  sql_append?: string;
}
