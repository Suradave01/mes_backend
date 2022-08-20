/* eslint-disable prettier/prettier */
import { TriggerModel } from 'src/asset-management/entities';
import { CompanyModel } from 'src/company-management/entities/company.entity';
import { ContactMappingChannelModel } from 'src/contact-management/entities';

import { BaseState } from 'src/share/lib/base-state';
import {
  StateChannelDef,
  optionsStateChannelDef,
} from 'src/state/alarm-management/channel.state';
import { UserModel } from 'src/user-management/entities';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ChannelMappingWipFlowModel, ChannelMappingWipModel } from '.';
import { MessageModel } from './message.entity';
import { TemplateModel } from './template.entity';
@Entity({ name: 'tb_channel' })
export class ChannelModel extends BaseState {
  constructor() {
    super(StateChannelDef, optionsStateChannelDef);
  }

  @PrimaryGeneratedColumn({
    name: 'channel_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  channel_name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  type: string;

  @Column({
    type: 'integer',
    nullable: true,
  })
  template_id: number;

  @OneToMany(
    () => ContactMappingChannelModel,
    (ContactMappingChannel) => ContactMappingChannel.Channel,
  )
  @JoinColumn([{ name: 'channel_id' }])
  ContactMappingChannels: ContactMappingChannelModel[];

  @OneToMany(() => TriggerModel, (trigger) => trigger.Channel)
  @JoinColumn([{ name: 'channel_id' }])
  Triggers: TriggerModel[];

  @OneToMany(
    () => ChannelMappingWipFlowModel,
    (ChannelMappingWipFlow) => ChannelMappingWipFlow.Channel,
  )
  @JoinColumn([{ name: 'channel_id' }])
  ChannelMappingWipFlows: ChannelMappingWipFlowModel[];

  @OneToMany(
    () => ChannelMappingWipModel,
    (ChannelMappingWip) => ChannelMappingWip.Channel,
  )
  @JoinColumn([{ name: 'channel_id' }])
  ChannelMappingWips: ChannelMappingWipModel[];

  @OneToMany(() => MessageModel, (message) => message.Channel)
  @JoinColumn([{ name: 'channel_id' }])
  Messages: MessageModel[];

  @ManyToOne(() => UserModel, (user) => user.Channels)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel[];

  @ManyToOne(() => TemplateModel, (template) => template.Channels)
  @JoinColumn([{ name: 'template_id' }, { name: 'template_id' }])
  Template: TemplateModel[];
}
