import { BaseState } from '../../share/lib/base-state';
/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CompanyModel } from '../../company-management/entities';
import { UserModel } from '.';
import {
  optionsStateUserMappingCompanyDef,
  StateUserMappingCompanyDef,
  UserMappingCompanyTransition,
} from '../../state/company-management/user_mapping_company-state';

@Entity({ name: 'tb_user_mapping_company' })
export class UserMappingCompanyModel extends BaseState {
  // static tb_user_mapping_company: any;
  constructor() {
    super(StateUserMappingCompanyDef, optionsStateUserMappingCompanyDef);
  }

  @PrimaryGeneratedColumn({
    name: 'tb_user_mapping_company_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  user_id: number;

  @Column({
    type: 'integer',
  })
  company_id: number;

  @ManyToOne(() => UserModel, (user) => user.UserMappingCompanies)
  @JoinColumn([{ name: 'user_id' }, { name: 'user_id' }])
  User: UserModel;

  @ManyToOne(() => CompanyModel, (company) => company.UserMappingCompanies)
  @JoinColumn([{ name: 'company_id' }, { name: 'company_id' }])
  Company: CompanyModel;

  CoUserDelete(context: UserModel, event) {
    this.apply(UserMappingCompanyTransition.DELETE, context);
    this.saveState();
  }

  CoCompanyDelete(context: CompanyModel, event) {
    this.apply(UserMappingCompanyTransition.DELETE, context);
    this.saveState();
  }
}
