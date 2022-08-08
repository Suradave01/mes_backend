/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import {
  StateTemplateDef,
  optionsStateTemplateDef,
} from 'src/state/alarm-management/template.state';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ChannelModel } from './channel.entity';
import { MessageModel } from './message.entity';
@Entity({ name: 'tb_template' })
export class TemplateModel extends BaseState {
  constructor() {
    super(StateTemplateDef, optionsStateTemplateDef);
  }

  @PrimaryGeneratedColumn({
    name: 'template_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  template_name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  subject_template: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  body_template: string;

  @OneToMany(() => ChannelModel, (channel) => channel.Template)
  @JoinColumn([{ name: 'template_id' }])
  Channels: ChannelModel[];

  @OneToMany(() => MessageModel, (message) => message.Template)
  @JoinColumn([{ name: 'template_id' }])
  Messages: MessageModel[];
}
