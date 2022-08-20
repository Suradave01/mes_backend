import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_camera' })
export class CameraModel {
  @PrimaryGeneratedColumn({
    name: 'camera_id',
    type: 'integer',
  })
  camera_id: number;

  @Column({
    name: 'camera_name',
    type: 'varchar',
    nullable: true,
  })
  camera_name: string;

  @Column({
    name: 'ip_address',
    type: 'varchar',
    unique: true,
  })
  ip_address: string;

  @Column({
    name: 'position',
    type: 'varchar',
    nullable: true,
  })
  position: string;

  @Column({
    name: 'user',
    type: 'varchar',
    nullable: true,
  })
  user: string;

  @Column({
    name: 'pass',
    type: 'varchar',
    nullable: true,
  })
  pass: string;
}
