/* eslint-disable prettier/prettier */
import {
  ChannelModel,
  MessageMappingContactChannelModel,
} from 'src/alarm-management/entities';
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateContactMappingChannelDef,
  StateContactMappingChannelDef,
} from 'src/state/contact-management/contact_mapping_channel-state';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ContactModel } from '.';
@Entity({ name: 'tb_contact_mapping_channel' })
export class ContactMappingChannelModel extends BaseState {
  constructor() {
    super(StateContactMappingChannelDef, optionsStateContactMappingChannelDef);
  }

  @PrimaryGeneratedColumn({
    name: 'contact_mapping_channel_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  contact_id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  value: string;

  @Column({
    type: 'integer',
  })
  channel_id: number;

  @Column({ name: '_primary' })
  _primary: boolean;

  @ManyToOne(() => ContactModel, (contact) => contact.ContactMappingChannels)
  @JoinColumn([{ name: 'contact_id' }, { name: 'contact_id' }])
  Contact: ContactModel;

  @ManyToOne(() => ChannelModel, (channel) => channel.ContactMappingChannels)
  @JoinColumn([{ name: 'channel_id' }, { name: 'channel_id' }])
  Channel: ChannelModel;

  @OneToMany(
    () => MessageMappingContactChannelModel,
    (MessageMappingContactChannel) =>
      MessageMappingContactChannel.ContactMappingChannel,
  )
  @JoinColumn([{ name: 'contact_mapping_channel_id' }])
  MessageMappingContactChannels: MessageMappingContactChannelModel[];
}
