import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CameraManagementService } from './camera-management.service';
import { CreateCameraManagementDto } from './dto/create-camera-management.dto';
import { UpdateCameraManagementDto } from './dto/update-camera-management.dto';
import { UserCameraManagementDto } from './dto/user-camera-management.dto';
import { ViewCameraManagementDto } from './dto/view-camera-management.dto';

@ApiTags('camera-management')
@Controller('camera-management')
export class CameraManagementController {
  constructor(
    private readonly cameraManagementService: CameraManagementService,
  ) {}

  @Get('getAllCamera')
  @ApiOperation({ summary: 'Get All Data IP Camera' })
  async getAllCamera() {
    return this.cameraManagementService.getAllcamera();
  }

  @Post('createCamera')
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

  @Post('getCameraByUser')
  @ApiOperation({ summary: 'Get data IP camera' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'string',
          example: '192.168.1.210/axis-media/media.amp',
          description: 'rtsp',
        },
        pass: {
          type: 'string',
          example: '123123',
          description: 'password',
        },
      },
    },
  })
  async getCameraByUser(@Body() body: UserCameraManagementDto) {
    return this.cameraManagementService.getCameraByUser(body);
  }

  @Post('viewCamera')
  @ApiOperation({ summary: 'View Stream IP Camera' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rtsp: {
          type: 'string',
          example:
            'rtsp://admin:D3v0t3D%$@tsdbpvpn.dyndns.org/doc/page/preview.asp',
          description: 'rtsp stream',
        },
      },
    },
  })
  async viewCamera(@Body() body: ViewCameraManagementDto) {
    return this.cameraManagementService.viewCamera(body);
  }

  @Get('getCameraById/:id')
  @ApiOperation({ summary: 'Get data IP camera By ID' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter id',
    required: true,
  })
  async getCameraById(@Param('id') id: string) {
    return this.cameraManagementService.getCameraById(Number(id));
  }

  @Patch('updateCamera/:id')
  @ApiOperation({ summary: 'UPDATE new data' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter id',
    required: true,
  })
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
  async updateCamera(
    @Param('id') id: string,
    @Body() body: UpdateCameraManagementDto,
  ) {
    return this.cameraManagementService.updateCamera(Number(id), body);
  }

  @Delete('removeCamera/:id')
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter id',
    required: true,
  })
  @ApiOperation({ summary: 'Delete IP camera' })
  async removeCamera(@Param('id') id: number) {
    return this.cameraManagementService.removeCamera(+id);
  }
}
