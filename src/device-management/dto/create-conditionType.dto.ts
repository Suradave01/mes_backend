export class CreateConditionTypeDto {
  condition_type_name: string;
  description: string;
  field_compare: FIELD_COMPARE;
  condition: CONDITION;
}

export enum FIELD_COMPARE {
  string_value = 'string_value',
  number_value = 'number_value',
}

export enum CONDITION {
  min = '<',
  min_equals = '<=',
  equals = '==',
  max = '>',
  max_equals = '>=',
}
