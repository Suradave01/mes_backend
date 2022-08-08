import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CameraManagementService } from './camera-management.service';
import { CreateCameraManagementDto } from './dto/create-camera-management.dto';
import { UserCameraManagementDto } from './dto/user-camera-management.dto';

@ApiTags('camera-management')
@Controller('camera-management')
export class CameraManagementController {
  constructor(
    private readonly cameraManagementService: CameraManagementService,
  ) {}

  @Post('stream')
  @ApiOperation({ summary: 'Create new IP Camera' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        camera_name: {
          type: 'string',
          example: 'Hikvision PTZ',
          description: 'camera name',
        },
        ip_address: {
          type: 'string',
          example: '192.168.1.210/axis-media/media.amp',
          description: 'ip address',
        },
        position: {
          type: 'string',
          example: 'Side Doors',
          description: 'position',
        },
        user: {
          type: 'string',
          example: 'admin',
          description: 'username',
        },
        pass: {
          type: 'string',
          example: '123123',
          description: 'password',
        },
      },
    },
  })
  async createCamera(@Body() body: CreateCameraManagementDto) {
    return this.cameraManagementService.createCamera(body);
  }

  @Post('data')
  @ApiOperation({ summary: 'Get data IP camera' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          example: 'admin',
          description: 'username',
        },
        pass: {
          type: 'string',
          example: '123123',
          description: 'password',
        },
      },
    },
  })
  async getDevice(@Body() body: UserCameraManagementDto) {
    return this.cameraManagementService.getDevice(body);
  }
}
