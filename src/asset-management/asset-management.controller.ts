import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AssetManagementService } from './asset-management.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { CreateAssetMappingDeviceDto } from './dto/create-assetMappingDevice.dto';
import { CreateConditionTypeDto } from './dto/create-condition_type.dto';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { UpdateAssetMappingDeviceDto } from './dto/update-assetMappingDevice.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';

@ApiTags('asset-management')
@Controller('asset-management')
export class AssetManagementController {
  constructor(
    private readonly assetManagementService: AssetManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('createAsset')
  createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetManagementService.createAsset(createAssetDto);
  }

  @UseGuards(AuthGuard())
  @Post('createAssetMappingDevice')
  createAssetMappingDevice(
    @Body() createAssetMappingDeviceDto: CreateAssetMappingDeviceDto,
  ) {
    return this.assetManagementService.createAssetMappingDevice(
      createAssetMappingDeviceDto,
    );
  }

  @UseGuards(AuthGuard())
  @Post('createConditionType')
  createConditionType(@Body() createConditionTypeDto: CreateConditionTypeDto) {
    return this.assetManagementService.createConditionType(
      createConditionTypeDto,
    );
  }

  @UseGuards(AuthGuard())
  @Get('findAllAsset')
  findAllAsset() {
    return this.assetManagementService.findAllAsset();
  }

  @UseGuards(AuthGuard())
  @Get('findAllAssetActive')
  findAllAssetActive() {
    return this.assetManagementService.findAllAssetActive();
  }

  @Get('findOneAsset/:id')
  findOneAsset(@Param('id') id: string) {
    return this.assetManagementService.findOneAsset(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateAsset/:id')
  updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetManagementService.updateAsset(+id, updateAssetDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllAssetMappingDevice')
  findAllAssetMappingDevice() {
    return this.assetManagementService.findAllAssetMappingDevice();
  }

  @UseGuards(AuthGuard())
  @Delete('removeAssetMappingDevice/:id')
  removeAssetMappingDevice(@Param('id') id: number) {
    return this.assetManagementService.removeAssetMappingDevice(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateAssetMappingDeviceActive/:id')
  updateStateAssetMappingDeviceActive(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetMappingDeviceActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateAssetActive/:id')
  updateStateAssetActive(@Param('id') id: number) {
    return this.assetManagementService.updateStateAssetActive(+id);
  }

  @Patch('updateStateAssetInactive/:id')
  updateStateAssetInactive(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateAssetRunning/:id')
  updateStateAssetRunning(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetRunning(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateAssetWarning/:id')
  updateStateAssetWarning(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetWarning(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateAssetStop/:id')
  updateStateAssetStop(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetStop(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeAsset/:id')
  remove(@Param('id') id: string) {
    return this.assetManagementService.removeAsset(+id);
  }

  @UseGuards(AuthGuard())
  @Post('createTrigger')
  createTrigger(@Body() createTriggerDto: CreateTriggerDto) {
    return this.assetManagementService.createTrigger(createTriggerDto);
  }

  @UseGuards(AuthGuard())
  @Patch('updateTrigger/:id')
  updateTrigger(
    @Param('id') id: number,
    @Body() updateTriggerDto: UpdateTriggerDto,
  ) {
    return this.assetManagementService.updateTrigger(+id, updateTriggerDto);
  }

  @Get('findOneTrigger/:id')
  findOneTrigger(@Param('id') id: number) {
    return this.assetManagementService.findOneTrigger(+id);
  }

  @UseGuards(AuthGuard())
  @Get('findAllTrigger')
  findAllTrigger() {
    return this.assetManagementService.findAllTrigger();
  }

  @UseGuards(AuthGuard())
  @Get('findAllTriggerActive')
  findAllTriggerActive() {
    return this.assetManagementService.findAllTriggerActive();
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateTriggerActive/:id')
  updateStateTriggerActive(@Param('id') id: string) {
    return this.assetManagementService.updateStateTriggerActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateTriggerInactive/:id')
  updateStateTriggerInactive(@Param('id') id: string) {
    return this.assetManagementService.updateStateTriggerInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeTrigger/:id')
  removeTrigger(@Param('id') id: string) {
    return this.assetManagementService.removeTrigger(+id);
  }
}
