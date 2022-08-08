/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TriggerModel } from '.';

@Entity({ name: 'tb_condition_type' })
export class ConditionTypeModel {
  @PrimaryGeneratedColumn({
    name: 'condition_type_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  condition_type_name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  field_compare: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  condition: string;

  @OneToMany(() => TriggerModel, (conditionType) => conditionType.ConditionType)
  @JoinColumn([{ name: 'condition_type_id' }])
  Triggers: TriggerModel[];
}
