/* eslint-disable prettier/prettier */
import { BaseState } from 'src/share/lib/base-state';
import { UserModel } from 'src/user-management/entities/user.entity';
import { ImportModel } from './import.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tb_import_data' })
export class ImportDataModel {
  @PrimaryGeneratedColumn({
    name: 'import_data_id',
    type: 'integer',
  })
  id: number;

  @Column({
    type: 'integer',
  })
  import_id: number;

  @Column({
    nullable: true,
    name: 'sheet_name',
    type: 'varchar',
  })
  sheet_name: string;

  @Column({
    nullable: true,
    name: 'raw_data',
    type: 'simple-json',
    default: '{}',
  })
  raw_data: { data: object[] };

  @ManyToOne(() => ImportModel, (imports) => imports.ImportData)
  @JoinColumn([{ name: 'import_id' }, { name: 'import_id' }])
  Import: ImportModel;
}
