export class CreateWorkOrderItemDto {
  workOrder_id: number;
  wip_flow_mapping_id: number;
  remark_by?: string;
  remark?: string;
  import_id?: number;
  field_name: string;
  field_value: string;
  asset_cancel_count: number;
}
