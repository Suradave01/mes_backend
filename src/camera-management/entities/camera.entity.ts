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
  })
  camera_name: string;

  @Column({
    name: 'ip_address',
    type: 'varchar',
  })
  ip_address: string;

  @Column({
    name: 'position',
    type: 'varchar',
  })
  position: string;

  @Column({
    name: 'user',
    type: 'varchar',
  })
  user: string;

  @Column({
    name: 'pass',
    type: 'varchar',
  })
  pass: string;
}
