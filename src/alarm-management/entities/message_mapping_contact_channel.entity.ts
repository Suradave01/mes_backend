/* eslint-disable prettier/prettier */
import { ContactMappingChannelModel } from 'src/contact-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  StateMessageMappingContactChannelDef,
  optionsStateMessageMappingContactChannelDef,
} from 'src/state/alarm-management/message_mapping_contact_channel.state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MessageModel } from './message.entity';
@Entity({ name: 'tb_message_mapping_contact_channel' })
export class MessageMappingContactChannelModel extends BaseState {
  constructor() {
    super(
      StateMessageMappingContactChannelDef,
      optionsStateMessageMappingContactChannelDef,
    );
  }

  @PrimaryGeneratedColumn({
    name: 'message_mapping_contact_channel_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  contact_mapping_channel_id: number;

  @Column({
    type: 'integer',
  })
  message_id: number;

  @Column({
    type: 'text',
  })
  raw_message: string;

  @ManyToOne(
    () => MessageModel,
    (message) => message.MessageMappingContactChannels,
  )
  @JoinColumn([{ name: 'message_id' }, { name: 'message_id' }])
  Message: MessageModel;

  @ManyToOne(
    () => ContactMappingChannelModel,
    (ContactMappingChannel) =>
      ContactMappingChannel.MessageMappingContactChannels,
  )
  @JoinColumn([
    { name: 'contact_mapping_channel_id' },
    { name: 'contact_mapping_channel_id' },
  ])
  ContactMappingChannel: ContactMappingChannelModel;
}
