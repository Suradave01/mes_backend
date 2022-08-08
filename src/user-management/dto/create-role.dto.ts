/* eslint-disable prettier/prettier */
export class CreateRoleDto {
  role_name: string;
  role_description: string;
  resource_id: number[];
  permission_id: number[];
}
