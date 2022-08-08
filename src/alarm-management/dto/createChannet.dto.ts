export class CreateChannelDto {
  channel_name: string;
  description: string;
  create_by?: number;
  type: ChannelType;
  template_id: number;
}

export enum ChannelType {
  LINE = 'LINE',
  EMAIL = 'EMAIL',
}
