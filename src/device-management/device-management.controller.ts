import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  ClientProxy,
  CustomTransportStrategy,
  EventPattern,
  MessagePattern,
  Payload,
  Server,
} from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { DeviceFieldModel } from 'src/asset-management/entities/device_field.entity';
import { StateRunner } from 'src/share/lib/state-runner';
import { Connection } from 'typeorm';
import { DeviceManagementService } from './device-management.service';
import { CreateConditionTypeDto } from './dto/create-conditionType.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateDeviceFieldDto } from './dto/create-deviceField.dto';
import { UpdateConditionTypeDto } from './dto/update-conditionType.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@ApiTags('device-management')
@Controller('device-management')
// @UseGuards(AuthGuard())
export class DeviceManagementController {
  constructor(
    private readonly connection: Connection,

    private readonly deviceManagementService: DeviceManagementService,
    @Inject('MQTT_PUBSUB') private client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @UseGuards(AuthGuard())
  @Post('createDevice')
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceManagementService.createDevice(createDeviceDto);
  }

  @UseGuards(AuthGuard())
  @Post('createDeviceField')
  createDeviceField(@Body() createDeviceFieldDto: CreateDeviceFieldDto) {
    return this.deviceManagementService.createDeviceField(createDeviceFieldDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllDevice')
  findAllDevice() {
    return this.deviceManagementService.findAllDevice();
  }

  @UseGuards(AuthGuard())
  @Get('findAllDeviceUnMapAsset')
  findAllDeviceUnMapAsset() {
    return this.deviceManagementService.findAllDeviceUnMapAsset();
  }

  @UseGuards(AuthGuard())
  @Get('findAllDeviceField')
  findAllDeviceField() {
    return this.deviceManagementService.findAllDeviceField();
  }

  @Get('findOneDevice/:id')
  findOneDevice(@Param('id') id: string) {
    return this.deviceManagementService.findOneDevice(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateDevice/:id')
  updateDevice(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.deviceManagementService.updateDevice(+id, updateDeviceDto);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateDeviceActive/:id')
  updateStateDeviceActive(@Param('id') id: string) {
    return this.deviceManagementService.updateStateDeviceActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateDeviceFieldActive/:id')
  updateStateDeviceFieldActive(@Param('id') id: string) {
    return this.deviceManagementService.updateStateDeviceFieldActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateDeviceInactive/:id')
  updateStateDeviceInactive(@Param('id') id: string) {
    return this.deviceManagementService.updateStateDeviceInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeDevice/:id')
  removeDevice(@Param('id') id: string) {
    return this.deviceManagementService.removeDevice(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeDeviceField/:id')
  removeDeviceField(@Param('id') id: string) {
    return this.deviceManagementService.removeDeviceField(+id);
  }

  //pub random
  @Get('sensor/pub/speed')
  async pubSensor() {
    setInterval(() => {
      var math = Math.random() * 50;
      var random = math;
      const data = {
        id: 1,
        type: 'number',
        value: random,
      };
      if (Number(random) < 30 && Number(random) > 9) {
        // console.log('PUB TO MQTT_BROKER ' + random);
        return this.client.emit<any>(`sensor/speed`, data);
      }
    }, 5000);
  }

  // passingData
  public dataDevice: any[] = [];
  @EventPattern('plc/sensor')
  async passingDataDeviceField(@Payload() payload: any) {
    const { id, type, value } = payload;

    const lastIndex = this.dataDevice.findIndex((field) => field.id === id);

    if (lastIndex !== -1) this.dataDevice[lastIndex] = payload;
    if (lastIndex == -1) this.dataDevice.push(payload);
    // console.log(this.dataDevice);

    var d = new Date();
    var hr = d.getHours();
    var min: any = d.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    var ampm = 'am';
    if (hr > 12) {
      hr -= 12;
      ampm = 'pm';
    }
    // console.log('9:50am');

    // console.log(hr + ':' + min + ampm);
  }

  @UseGuards(AuthGuard())
  @Get('updateDataDeviceField')
  async updateDataDeviceField() {
    const params = this.dataDevice;
    await this.deviceManagementService.passingDataDeviceField(params);
  }

  // @MessagePattern('plc/sensor')
  // async updateDataDeviceField(@Payload() payload: any) {
  //   const { id } = payload;
  //   await this.deviceManagementService.passingDataDeviceField(id, payload);
  // }

  @UseGuards(AuthGuard())
  @Post('createConditionType')
  async createConditionType(
    @Body() createConditionTypeDto: CreateConditionTypeDto,
  ) {
    return this.deviceManagementService.createConditionType(
      createConditionTypeDto,
    );
  }

  @UseGuards(AuthGuard())
  @Get('findAllConditionType')
  findAllConditionType() {
    return this.deviceManagementService.findAllConditionType();
  }

  @Get('findOneConditionType/:id')
  findOneConditionType(@Param('id') id: number) {
    return this.deviceManagementService.findOneConditionType(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateConditionType/:id')
  updateConditionType(
    @Param('id') id: string,
    @Body() updateConditionTypeDto: UpdateConditionTypeDto,
  ) {
    return this.deviceManagementService.updateConditionType(
      +id,
      updateConditionTypeDto,
    );
  }

  @UseGuards(AuthGuard())
  @Delete('removeConditionType/:id')
  removeConditionType(@Param('id') id: string) {
    return this.deviceManagementService.removeConditionType(+id);
  }

  @Post('plc/sensor_reset')
  async pubResetSensor(@Body() asset_id: number) {
    const data = {
      values: 0,
    };
    this.client.emit<any>(`plc/sensor_reset/${asset_id}`, data);
  }
}
