export class CreateDeviceDto {
  company_id: number;
  device_name: string;
  description: string;
  deviceField: [
    {
      field_name: string;
      field_type: string;
      field_order: string;
      field_description: string;
    },
  ];
}
