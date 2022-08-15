import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCameraManagementDto } from './dto/create-camera-management.dto';
import { UpdateCameraManagementDto } from './dto/update-camera-management.dto';
import { UserCameraManagementDto } from './dto/user-camera-management.dto';
import { CameraModel } from './entities/camera.entity';

@Injectable()
export class CameraManagementService {
  constructor(
    @InjectRepository(CameraModel)
    private DevicesRepository: Repository<CameraModel>,
  ) {}

  async getAllcamera() {
    return this.DevicesRepository.find();
  }

  async createCamera(data: CreateCameraManagementDto) {
    if (data.user && data.pass) {
      const rtsp = `rtsp://${data.user}:${data.pass}@${data.ip_address}`;
      return this.DevicesRepository.save({
        camera_name: data.camera_name,
        ip_address: rtsp,
        position: data.position,
        user: data.user,
        pass: data.pass,
      });
    }
    return this.DevicesRepository.save({
      camera_name: data.camera_name,
      ip_address: `rtsp://${data.ip_address}`,
      position: data.position,
    });
  }

  async getCameraByUser(data: UserCameraManagementDto) {
    return this.DevicesRepository.find({
      where: {
        user: data.user,
        pass: data.pass,
      },
    });
  }

  async updateCamera(id: number, data: UpdateCameraManagementDto) {
    return this.DevicesRepository.update(id, data);
  }

  async removeCamera(id: number) {
    return await this.DevicesRepository.delete(id);
  }
}
