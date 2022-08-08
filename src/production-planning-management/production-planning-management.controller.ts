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
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/authentication/get-user.decorator';
import { ProcessImportDataPlanningDto } from 'src/import-data/dto/process-import-data-planning.dto';
import { UserModel } from 'src/user-management/entities';
import { CreateWipDto } from './dto/create-wip.dto';
import { CreateWipFlowDto } from './dto/create-wipFlow.dto';
import { UpdateWipDto } from './dto/update-wip.dto';
import { UpdateWipFlowDto } from './dto/update-wipFlow.dto';
import { UpdateWorkOrderItemDto } from './dto/update-workOrderItem.dto';
import { WoItemStart } from './dto/woItem_start.dto';
import { ProductionPlanningManagementService } from './production-planning-management.service';

@ApiTags('production-planning-management')
@Controller('production-planning-management')
@UseGuards(AuthGuard())
export class ProductionPlanningManagementController {
  constructor(
    private readonly productionPlanningManagementService: ProductionPlanningManagementService,
  ) {}

  @Post('createWip')
  async createWip(
    @Body()
    createWipDto: CreateWipDto,
  ) {
    await this.productionPlanningManagementService.createWip(createWipDto);
  }

  @Patch('updateWip/:id')
  async updateWip(
    @Param('id') id: number,
    @Body()
    updateWipDto: UpdateWipDto,
  ) {
    return await this.productionPlanningManagementService.updateWip(
      +id,
      updateWipDto,
    );
  }

  @Get('findOneWip/:id')
  async findOneWip(@Param('id') id: number) {
    return await this.productionPlanningManagementService.findOneWip(+id);
  }

  @Get('findOneWipWhere/:id')
  async findOneWipWhere(@Param('id') id: number) {
    const wip_name = 'ลูกฟูก';
    return await this.productionPlanningManagementService.findOneWipWhere(
      +id,
      wip_name,
    );
  }

  @Get('findAllWip')
  async findAllWip() {
    return await this.productionPlanningManagementService.findAllWip();
  }

  @Get('findAllWipActive')
  async findAllWipActive() {
    return await this.productionPlanningManagementService.findAllWipActive();
  }

  @Post('processCreateWorkOrder/:id')
  async processCreateWorkOrder(
    @Param('id') id: number,
    @Body() processImportDataPlanningDto: ProcessImportDataPlanningDto,
    @GetUser() user: UserModel,
  ) {
    const { ref_wip_flow_id } = processImportDataPlanningDto;
    return await this.productionPlanningManagementService.processCreateWorkOrder(
      +id,
      ref_wip_flow_id,
      user,
    );
  }

  @Post('prioritizeWorkOrder')
  async prioritizeWorkOrder(@Body() prioritize: any) {
    return await this.productionPlanningManagementService.prioritizeWorkOrder(
      prioritize,
    );
  }

  @Post('wipMappingAsset/:id')
  async wipMappingAsset(@Param('id') id: number) {}

  @Delete('wipUnMappingAsset/:id')
  async wipUnMappingAsset(@Param('id') id: number) {}

  @Delete('removeWip/:id')
  async removeWip(@Param('id') id: number) {}

  @Post('createWipFlow')
  async createWipFlow(
    @Body()
    createWipFlowDto: CreateWipFlowDto,
  ) {
    return await this.productionPlanningManagementService.createWipFlow(
      createWipFlowDto,
    );
  }

  @Get('findAllWipFlow')
  async findAllWipFlow() {
    return await this.productionPlanningManagementService.findAllWipFlow();
  }

  @Get('findOneWipFlow/:id')
  async findOneWipFlow(@Param('id') id: number) {
    return await this.productionPlanningManagementService.findOneWipFlow(+id);
  }

  @Patch('updateWipFlow/:id')
  async updateWipFlow(
    @Param('id') id: number,
    @Body() updateWipFlowDto: UpdateWipFlowDto,
  ) {
    return await this.productionPlanningManagementService.updateWipFlow(
      +id,
      updateWipFlowDto,
    );
  }

  // @Get('findAllWorkOrderItemByWip/:id')
  // findAllWorkOrderItemByWip(@Param('id') id: number) {
  //   return this.productionPlanningManagementService.findAllWorkOrderItemByWip(
  //     +id,
  //   );
  // }

  @Get('findAllWorkOrderByWip/:id')
  findAllWorkOrderByWip(@Param('id') id: number) {
    return this.productionPlanningManagementService.findAllWorkOrderByWip(+id);
  }

  @Get('findWorkOrderByDate/:date')
  findWorkOrderByDate(@Param('date') date: string) {
    return this.productionPlanningManagementService.findWorkOrderByDate(date);
  }

  @Patch('updateWorkOrderItemType/:id')
  async updateWorkOrderItemType(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemType(
      +id,
      options,
    );
  }

  @Patch('updateWorkOrderItemNextAsset/:id')
  async updateWorkOrderItemNextAsset(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemNextAsset(
      +id,
      options,
    );
  }

  @Patch('updateWorkOrderItemDetail/:id')
  async updateWorkOrderItemDetail(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemDetail(
      +id,
      options,
    );
  }

  @Patch('updateWoItemStart/:id')
  async updateWoItemStart(
    @Param('id') id: number,
    @Body() woItemStart: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemStart(
      +id,
      woItemStart,
    );
  }

  @Patch('updateWoItemStop/:id')
  async updateWoItemStop(
    @Param('id') id: number,
    @Body() woItemStart: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemStop(
      +id,
      woItemStart,
    );
  }

  @Patch('updateWoItemResume/:id')
  async updateWoItemResume(
    @Param('id') id: number,
    @Body() woItemStart: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemResume(
      +id,
      woItemStart,
    );
  }

  @Patch('updateWoItemCancel/:id')
  async updateWoItemCancel(
    @Param('id') id: number,
    @Body() woItemStart: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemCancel(
      +id,
      woItemStart,
    );
  }

  @Patch('updateWoItemRetrieve/:id')
  async updateWoItemRetrieve(
    @Param('id') id: number,
    @Body() woItemStart: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemRetrieve(
      +id,
      woItemStart,
    );
  }

  @Patch('updateWoItemFinish/:id')
  async updateWoItemFinish(
    @Param('id') id: number,
    @Body() options: WoItemStart,
  ) {
    return await this.productionPlanningManagementService.updateWoItemFinish(
      +id,
      options,
    );
  }

  @Patch('copyWorkOrder/:id')
  async copyWorkOrder(@Param('id') id: number, @GetUser() user: UserModel) {
    return await this.productionPlanningManagementService.copyWorkOrder(
      +id,
      user,
    );
  }

  @Get('getValueSensorSuccess/:id')
  async getValueSensorSuccess(@Param('id') id: number) {
    return await this.productionPlanningManagementService.getValueSensorSuccess(
      +id,
    );
  }
}
