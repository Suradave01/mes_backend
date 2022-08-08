import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlarmManagementService } from './alarm-management.service';
import { CreateChannelDto } from './dto/createChannet.dto';
import { UpdateChannelDto } from './dto/updateChannel.dto';
import { Notify } from 'line-api';
import { LineNotifyDto } from './dto/lineNotify.dto';

@ApiTags('alarm-management')
@Controller('alarm-management')
export class AlarmManagementController {
  constructor(
    private readonly alarmManagementService: AlarmManagementService,
  ) {}

  @Post('createChannel')
  createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.alarmManagementService.createChannel(createChannelDto);
  }

  @Get('findAllChannel')
  findAllChannel() {
    return this.alarmManagementService.findAllChannel();
  }

  @Get('findAllChannelActive')
  findAllChannelActive() {
    return this.alarmManagementService.findAllChannelActive();
  }

  @Get('findOneChannel/:id')
  findOneChannel(@Param('id') id: string) {
    return this.alarmManagementService.findOneChannel(+id);
  }

  @Patch('updateChannel/:id')
  updateChannel(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.alarmManagementService.updateChannel(+id, updateChannelDto);
  }

  @Patch('updateStateChannelActive/:id')
  updateStateChannelActive(@Param('id') id: string) {
    return this.alarmManagementService.updateStateChannelActive(+id);
  }

  @Patch('updateStateChannelInactive/:id')
  updateStateChannelInactive(@Param('id') id: string) {
    return this.alarmManagementService.updateStateChannelInactive(+id);
  }

  @Delete('removeChannel/:id')
  remove(@Param('id') id: string) {
    return this.alarmManagementService.removeChannel(+id);
  }

  @Post('sendMessageLine')
  SendMessageLine() {
    // return this.alarmManagementService.sendMessageLine();
  }

  @Post('line/notify')
  async LineNotify(@Body() body: LineNotifyDto) {
    return this.alarmManagementService.lineNotify(body);
  }
}
