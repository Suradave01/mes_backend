import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlarmManagementService } from './alarm-management.service';
import { CreateChannelDto } from './dto/createChannel.dto';
import { UpdateChannelDto } from './dto/updateChannel.dto';
import { Notify } from 'line-api';
import { LineNotifyDto } from './dto/lineNotify.dto';
import { CreateContactMappingChannelDto } from './dto/createContactMappingChannel.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('alarm-management')
@Controller('alarm-management')
export class AlarmManagementController {
  constructor(
    private readonly alarmManagementService: AlarmManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('createChannel')
  createChannel(@Body() createChannelDto: CreateChannelDto) {
    return this.alarmManagementService.createChannel(createChannelDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllChannel')
  findAllChannel() {
    return this.alarmManagementService.findAllChannel();
  }

  @UseGuards(AuthGuard())
  @Get('findAllChannelActive')
  findAllChannelActive() {
    return this.alarmManagementService.findAllChannelActive();
  }

  @Get('findOneChannel/:id')
  findOneChannel(@Param('id') id: string) {
    return this.alarmManagementService.findOneChannel(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateChannel/:id')
  updateChannel(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ) {
    return this.alarmManagementService.updateChannel(+id, updateChannelDto);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateChannelActive/:id')
  updateStateChannelActive(@Param('id') id: string) {
    return this.alarmManagementService.updateStateChannelActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateChannelInactive/:id')
  updateStateChannelInactive(@Param('id') id: string) {
    return this.alarmManagementService.updateStateChannelInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeChannel/:id')
  remove(@Param('id') id: string) {
    return this.alarmManagementService.removeChannel(+id);
  }

  @Post('sendMessageLine')
  SendMessageLine() {
    // return this.alarmManagementService.sendMessageLine();
  }

  @UseGuards(AuthGuard())
  @Post('createContactMappingChannel')
  createContactMappingChannel(
    @Body() createContactMappingChannel: CreateContactMappingChannelDto,
  ) {
    return this.alarmManagementService.createContactMappingChannel(
      createContactMappingChannel,
    );
  }

  @UseGuards(AuthGuard())
  @Post('line/notify')
  async LineNotify(@Body() body: LineNotifyDto, clannel) {
    return this.alarmManagementService.lineNotify(body);
  }
}
