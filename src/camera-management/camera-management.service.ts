import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stream from 'node-rtsp-stream';
import { CreateCameraManagementDto } from './dto/create-camera-management.dto';
import { UpdateCameraManagementDto } from './dto/update-camera-management.dto';
import { UserCameraManagementDto } from './dto/user-camera-management.dto';
import { ViewCameraManagementDto } from './dto/view-camera-management.dto';
import { CameraModel } from './entities/camera.entity';

@Injectable()
export class CameraManagementService {
  constructor(
    @InjectRepository(CameraModel)
    private CameraRepository: Repository<CameraModel>,
  ) {}

  async getAllcamera() {
    return this.CameraRepository.find();
  }

  async createCamera(data: CreateCameraManagementDto) {
    if (data.user && data.pass) {
      const rtsp = `rtsp://${data.user}:${data.pass}@${data.ip_address}`;
      return this.CameraRepository.save({
        camera_name: data.camera_name,
        ip_address: rtsp,
        position: data.position,
        user: data.user,
        pass: data.pass,
      });
    }
    return this.CameraRepository.save({
      camera_name: data.camera_name,
      ip_address: `rtsp://${data.ip_address}`,
      position: data.position,
    });
  }

  async getCameraByUser(data: UserCameraManagementDto) {
    return this.CameraRepository.find({
      where: {
        user: data.user,
        pass: data.pass,
      },
    });
  }

  async viewCamera(data: ViewCameraManagementDto) {
    return data;
  }

  async getCameraById(id: number) {
    return this.CameraRepository.findOne(id);
  }

  async updateCamera(id: number, data: UpdateCameraManagementDto) {
    if (data.user && data.pass) {
      const rtsp = `rtsp://${data.user}:${data.pass}@${data.ip_address}`;
      return this.CameraRepository.update(id, {
        camera_name: data.camera_name,
        ip_address: rtsp,
        position: data.position,
        user: data.user,
        pass: data.pass,
      });
    }
    return this.CameraRepository.update(id, {
      camera_name: data.camera_name,
      ip_address: `rtsp://${data.ip_address}`,
      position: data.position,
    });
  }

  async removeCamera(id: number) {
    return await this.CameraRepository.delete(id);
  }
}
