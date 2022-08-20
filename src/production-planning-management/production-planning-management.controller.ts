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
import { FindAllWorkOrderByWipDto } from './dto/findAllWorkOrderByWip.dto';
import { UpdateWipDto } from './dto/update-wip.dto';
import { UpdateWipFlowDto } from './dto/update-wipFlow.dto';
import { UpdateWorkOrderItemDto } from './dto/update-workOrderItem.dto';
import { WoItemStart } from './dto/woItem_start.dto';
import { ProductionPlanningManagementService } from './production-planning-management.service';

@ApiTags('production-planning-management')
@Controller('production-planning-management')
export class ProductionPlanningManagementController {
  constructor(
    private readonly productionPlanningManagementService: ProductionPlanningManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('createWip')
  async createWip(
    @Body()
    createWipDto: CreateWipDto,
  ) {
    await this.productionPlanningManagementService.createWip(createWipDto);
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Get('findAllWip')
  async findAllWip() {
    return await this.productionPlanningManagementService.findAllWip();
  }

  @UseGuards(AuthGuard())
  @Get('findAllWipActive')
  async findAllWipActive() {
    return await this.productionPlanningManagementService.findAllWipActive();
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Post('prioritizeWorkOrder')
  async prioritizeWorkOrder(@Body() prioritize: any) {
    return await this.productionPlanningManagementService.prioritizeWorkOrder(
      prioritize,
    );
  }

  @UseGuards(AuthGuard())
  @Post('wipMappingAsset/:id')
  async wipMappingAsset(@Param('id') id: number) {}

  @UseGuards(AuthGuard())
  @Delete('wipUnMappingAsset/:id')
  async wipUnMappingAsset(@Param('id') id: number) {}

  @UseGuards(AuthGuard())
  @Delete('removeWip/:id')
  async removeWip(@Param('id') id: number) {}

  @UseGuards(AuthGuard())
  @Post('createWipFlow')
  async createWipFlow(
    @Body()
    createWipFlowDto: CreateWipFlowDto,
  ) {
    return await this.productionPlanningManagementService.createWipFlow(
      createWipFlowDto,
    );
  }

  @UseGuards(AuthGuard())
  @Get('findAllWipFlow')
  async findAllWipFlow() {
    return await this.productionPlanningManagementService.findAllWipFlow();
  }

  @Get('findOneWipFlow/:id')
  async findOneWipFlow(@Param('id') id: number) {
    return await this.productionPlanningManagementService.findOneWipFlow(+id);
  }

  @UseGuards(AuthGuard())
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

  // @UseGuards(AuthGuard())
  @Post('findAllWorkOrderByWip/:id')
  findAllWorkOrderByWip(
    @Param('id') id: number,
    @Body() body: FindAllWorkOrderByWipDto,
    @GetUser() user: UserModel,
  ) {
    // if (user.is_system === true) {

    return this.productionPlanningManagementService.findAllWorkOrderByWip(
      +id,
      body,
    );
    // } else {
    //   return false;
    // }
  }

  @UseGuards(AuthGuard())
  @Patch('updateWorkOrderItemType/:id')
  async updateWorkOrderItemType(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemType(
      +id,
      options,
    );
  }

  @UseGuards(AuthGuard())
  @Patch('updateWorkOrderItemNextAsset/:id')
  async updateWorkOrderItemNextAsset(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemNextAsset(
      +id,
      options,
    );
  }

  @UseGuards(AuthGuard())
  @Patch('updateWorkOrderItemDetail/:id')
  async updateWorkOrderItemDetail(@Param('id') id: number, @Body() options) {
    return await this.productionPlanningManagementService.updateWorkOrderItemDetail(
      +id,
      options,
    );
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Patch('copyWorkOrder/:id')
  async copyWorkOrder(@Param('id') id: number, @GetUser() user: UserModel) {
    return await this.productionPlanningManagementService.copyWorkOrder(
      +id,
      user,
    );
  }

  @UseGuards(AuthGuard())
  @Get('getValueSensorSuccess/:id')
  async getValueSensorSuccess(@Param('id') id: number) {
    return await this.productionPlanningManagementService.getValueSensorSuccess(
      +id,
    );
  }
}
