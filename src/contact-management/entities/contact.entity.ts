/* eslint-disable prettier/prettier */
import { MessageModel } from 'src/alarm-management/entities';
import { CompanyModel } from 'src/company-management/entities/company.entity';
import { BaseState } from 'src/share/lib/base-state';
import {
  optionsStateContactDef,
  StateContactDef,
} from 'src/state/contact-management/contact-state';
import { UserModel } from 'src/user-management/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ContactMappingChannelModel } from '.';
@Entity({ name: 'tb_contact' })
export class ContactModel extends BaseState {
  constructor() {
    super(StateContactDef, optionsStateContactDef);
  }

  @PrimaryGeneratedColumn({
    name: 'contact_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  contact_name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  contact_lastname: string;

  @Column({
    type: 'integer',
  })
  company_id: number;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  telephone_no: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  line_token: string;

  @ManyToOne(() => CompanyModel, (company) => company.Contacts)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  @ManyToOne(() => UserModel, (user) => user.Contacts)
  @JoinColumn([{ name: 'create_by' }, { name: 'user_id' }])
  CreateBy: UserModel;

  @OneToMany(
    () => ContactMappingChannelModel,
    (ContactMappingChannel) => ContactMappingChannel.Contact,
  )
  @JoinColumn([{ name: 'contact_id' }])
  ContactMappingChannels: ContactMappingChannelModel[];

  @OneToMany(() => MessageModel, (message) => message.Contact)
  @JoinColumn([{ name: 'contact_id' }])
  Messages: MessageModel[];
}
