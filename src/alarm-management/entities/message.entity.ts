/* eslint-disable prettier/prettier */
import { TriggerModel } from 'src/asset-management/entities';
import { CompanyModel } from 'src/company-management/entities/company.entity';
import { ContactModel } from 'src/contact-management/entities';
import { WorkOrderItemModel } from 'src/production-planning-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateMessageDef,
  optionsStateMessageDef,
} from 'src/state/alarm-management/message.state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ChannelModel } from './channel.entity';
import { MessageMappingContactChannelModel } from './message_mapping_contact_channel.entity';
import { TemplateModel } from './template.entity';
@Entity({ name: 'tb_message' })
export class MessageModel extends BaseState {
  constructor() {
    super(StateMessageDef, optionsStateMessageDef);
  }

  @PrimaryGeneratedColumn({
    name: 'message_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  template_id: number;

  @Column({
    type: 'integer',
  })
  channel_id: number;

  @Column({
    type: 'integer',
  })
  contact_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  subject: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  body: string;

  @Column({
    type: 'integer',
  })
  object_id_trigger: number;

  @Column({
    type: 'integer',
  })
  object_id_workorder_item: number;

  @Column({
    type: 'integer',
  })
  object_type_id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_to: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_event: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_event_datetime: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_link: string;

  @OneToMany(
    () => MessageMappingContactChannelModel,
    (MessageMappingContactChannel) => MessageMappingContactChannel.Message,
  )
  @JoinColumn([{ name: 'message_id' }])
  MessageMappingContactChannels: MessageMappingContactChannelModel[];

  @ManyToOne(() => ChannelModel, (channel) => channel.Messages)
  @JoinColumn([{ name: 'channel_id' }, { name: 'channel_id' }])
  Channel: ChannelModel;

  @ManyToOne(() => TemplateModel, (template) => template.Messages)
  @JoinColumn([{ name: 'template_id' }, { name: 'template_id' }])
  Template: TemplateModel;

  @ManyToOne(() => ContactModel, (contact) => contact.Messages)
  @JoinColumn([{ name: 'contact_id' }, { name: 'contact_id' }])
  Contact: ContactModel;

  @ManyToOne(() => TriggerModel, (trigger) => trigger.Messages)
  @JoinColumn([{ name: 'object_id_trigger' }, { name: 'trigger_id' }])
  Trigger: TriggerModel;

  @ManyToOne(
    () => WorkOrderItemModel,
    (workOrderItem) => workOrderItem.Messages,
  )
  @JoinColumn([
    { name: 'object_id_workorder_item' },
    { name: 'workorder_item_id' },
  ])
  workOrderItem: WorkOrderItemModel;
}
