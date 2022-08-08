import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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

  @Post('createAsset')
  createAsset(@Body() createAssetDto: CreateAssetDto) {
    return this.assetManagementService.createAsset(createAssetDto);
  }

  @Post('createAssetMappingDevice')
  createAssetMappingDevice(
    @Body() createAssetMappingDeviceDto: CreateAssetMappingDeviceDto,
  ) {
    return this.assetManagementService.createAssetMappingDevice(
      createAssetMappingDeviceDto,
    );
  }

  @Post('createConditionType')
  createConditionType(@Body() createConditionTypeDto: CreateConditionTypeDto) {
    return this.assetManagementService.createConditionType(
      createConditionTypeDto,
    );
  }

  @Get('findAllAsset')
  findAllAsset() {
    return this.assetManagementService.findAllAsset();
  }

  @Get('findAllAssetActive')
  findAllAssetActive() {
    return this.assetManagementService.findAllAssetActive();
  }

  @Get('findOneAsset/:id')
  findOneAsset(@Param('id') id: string) {
    return this.assetManagementService.findOneAsset(+id);
  }

  @Patch('updateAsset/:id')
  updateAsset(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetManagementService.updateAsset(+id, updateAssetDto);
  }

  @Get('findAllAssetMappingDevice/:id')
  findAllAssetMappingDevice() {
    return this.assetManagementService.findAllAssetMappingDevice();
  }

  @Delete('removeAssetMappingDevice/:id')
  removeAssetMappingDevice(@Param('id') id: number) {
    return this.assetManagementService.removeAssetMappingDevice(+id);
  }

  @Patch('updateStateAssetMappingDeviceActive/:id')
  updateStateAssetMappingDeviceActive(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetMappingDeviceActive(+id);
  }

  @Patch('updateStateAssetActive/:id')
  updateStateAssetActive(@Param('id') id: number) {
    return this.assetManagementService.updateStateAssetActive(+id);
  }

  @Patch('updateStateAssetInactive/:id')
  updateStateAssetInactive(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetInactive(+id);
  }

  @Patch('updateStateAssetRunning/:id')
  updateStateAssetRunning(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetRunning(+id);
  }

  @Patch('updateStateAssetWarning/:id')
  updateStateAssetWarning(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetWarning(+id);
  }

  @Patch('updateStateAssetStop/:id')
  updateStateAssetStop(@Param('id') id: string) {
    return this.assetManagementService.updateStateAssetStop(+id);
  }

  @Delete('removeAsset/:id')
  remove(@Param('id') id: string) {
    return this.assetManagementService.removeAsset(+id);
  }

  @Post('createTrigger')
  createTrigger(@Body() createTriggerDto: CreateTriggerDto) {
    return this.assetManagementService.createTrigger(createTriggerDto);
  }

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

  @Get('findAllTrigger')
  findAllTrigger() {
    return this.assetManagementService.findAllTrigger();
  }

  @Get('findAllTriggerActive')
  findAllTriggerActive() {
    return this.assetManagementService.findAllTriggerActive();
  }

  @Patch('updateStateTriggerActive/:id')
  updateStateTriggerActive(@Param('id') id: string) {
    return this.assetManagementService.updateStateTriggerActive(+id);
  }

  @Patch('updateStateTriggerInactive/:id')
  updateStateTriggerInactive(@Param('id') id: string) {
    return this.assetManagementService.updateStateTriggerInactive(+id);
  }

  @Delete('removeTrigger/:id')
  removeTrigger(@Param('id') id: string) {
    return this.assetManagementService.removeTrigger(+id);
  }
}
