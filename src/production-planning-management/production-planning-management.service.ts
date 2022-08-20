import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { WipTransition } from 'src/state/production-planning-management/wip.state';
import { WipFlowTransition } from 'src/state/production-planning-management/wip_flow-state';
import { WipFlowMappingTransition } from 'src/state/production-planning-management/wip_flow_mapping-state';
import { WorkOrderTransition } from 'src/state/production-planning-management/workorder-state';
import { Connection, Like, MoreThan, Not, Repository } from 'typeorm';
import { CreateProductionDto } from './dto/create-production.dto';
import { CreateWipDto } from './dto/create-wip.dto';
import { CreateWipFlowDto } from './dto/create-wipFlow.dto';
import { CreateWipFlowMappingDto } from './dto/create-wipFlowMapping.dto';
import { CreateWorkOrderDto } from './dto/create-workOrder.dto';
import { CreateWorkOrderItemDto } from './dto/create-workOrderItem.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { UpdateWipDto } from './dto/update-wip.dto';
import { UpdateWipFlowDto } from './dto/update-wipFlow.dto';
import { UpdateWorkOrderDto } from './dto/update-workOrder.dto';
import { ImportDataModel } from '../company-management/entities/import_data.entity';
import {
  ProductionModel,
  WipFlowMappingModel,
  WipFlowModel,
  WipModel,
  WorkOrderItemModel,
  WorkOrderModel,
} from './entities';
import { CompanyManagementService } from 'src/company-management/company-management.service';
import { NameOfMachine3 } from './dto/name_of_machine.enum';
import { UpdateWorkOrderItemDto } from './dto/update-workOrderItem.dto';
import { CustomerModel, ImportModel } from 'src/company-management/entities';
import { WorkOrderItemTransition } from 'src/state/production-planning-management/workorder_item-state';
import { WoItemStart } from './dto/woItem_start.dto';
import { AssetModel } from 'src/asset-management/entities';
import { AssetTransition } from 'src/state/asset-management/asset-state';
import { ImportTransition } from 'src/state/company-management/import-state';
import { UserModel } from 'src/user-management/entities';
import { FindAllWorkOrderByWipDto } from './dto/findAllWorkOrderByWip.dto';

@Injectable()
export class ProductionPlanningManagementService {
  constructor(
    private readonly connection: Connection,

    @InjectRepository(WipModel)
    private readonly WipModelRepository: Repository<WipModel>,

    @InjectRepository(AssetModel)
    private readonly AssetModelRepository: Repository<AssetModel>,

    @InjectRepository(WipFlowModel)
    private readonly WipFlowModelRepository: Repository<WipFlowModel>,

    @InjectRepository(WipFlowMappingModel)
    private readonly WipFlowMappingModelRepository: Repository<WipFlowMappingModel>,

    @InjectRepository(ImportDataModel)
    private readonly ImportDataModelRepository: Repository<ImportDataModel>,

    @InjectRepository(ImportModel)
    private readonly ImportModelRepository: Repository<ImportModel>,

    @InjectRepository(WorkOrderModel)
    private readonly WorkOrderModelRepository: Repository<WorkOrderModel>,

    @InjectRepository(WorkOrderItemModel)
    private readonly WorkOrderItemModelRepository: Repository<WorkOrderItemModel>,

    @InjectRepository(CustomerModel)
    private readonly CustomerModelRepository: Repository<CustomerModel>,

    private readonly CompanyManagementService: CompanyManagementService,
  ) {}

  async findOneWip(id: number) {
    const model = await this.WipModelRepository.findOne(id, {
      relations: [
        'WIPAssets',
        'WipFlowMappings',
        'ChannelMappingWips',
        'Company',
      ],
    });
    // let data: any = model.field_default[0];
    // console.log(data.name);

    return model;
  }

  async findOneWipWhere(id: number, wip_name: string) {
    const model = await this.WipModelRepository.findOne(id, {
      where: { name: wip_name },
      relations: [
        'WIPAssets',
        'WipFlowMappings',
        'ChannelMappingWips',
        'Company',
      ],
    });

    return model;
  }

  async findAllWip() {
    const model = await this.WipModelRepository.find({
      relations: [
        'WIPAssets',
        'WipFlowMappings',
        'ChannelMappingWips',
        'Company',
      ],
    });

    return model;
  }

  async findAllWipActive() {
    const model = await this.WipModelRepository.find({
      where: { state: 'active' },
      relations: [
        'WIPAssets',
        'WipFlowMappings',
        'ChannelMappingWips',
        'Company',
      ],
    });

    return model;
  }

  async createWip(createWipDto: CreateWipDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      name,
      description,
      company_id,
      // max_wip,
      fieldDefault,
      // calculate_function,
      // presentation_template,
    } = createWipDto;
    const model = new WipModel();
    model.name = name;
    model.description = description;
    model.company_id = company_id;
    // model.max_wip = max_wip;
    model.field_default = fieldDefault;
    // model.calculate_function = calculate_function;
    // model.presentation_template = presentation_template;

    await stateRunner.manager.save(model);
    // if (asset_id) {
    //   model.apply(WipTransition.NEW, stateRunner);
    //   model.apply(WipTransition.MAPPING_ASSET, stateRunner);
    // } else {
    model.apply(WipTransition.NEW, stateRunner);
    // }
    await model.saveState();
    await stateRunner.cleanup();

    return model;
  }

  async updateWip(id: number, updateWipDto: UpdateWipDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      name,
      description,
      company_id,
      // max_wip,
      fieldDefault,
      // calculate_function,
      // presentation_template,
    } = updateWipDto;

    await stateRunner.manager.update(WipModel, id, {
      name,
      description,
      company_id,
      // max_wip,
      field_default: fieldDefault,
      // calculate_function,
      // presentation_template,
    });
    await stateRunner.cleanup();
  }

  async removeWip(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.WipModelRepository.findOne(id, {
        relations: [
          'WIPAssets',
          'WipFlowMappings',
          'ChannelMappingWips',
          'Company',
        ],
      });

      model.apply(WipTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async findOneWipFlow(id: number) {
    const model = await this.WipFlowModelRepository.findOne(id, {
      relations: [
        'WorkOrders',
        'ChannelMappingWipFlows',
        'WipFlowMappings',
        'Company',
        'Production',
      ],
    });
    return model;
  }

  async findAllWipFlow() {
    const model = await this.WipFlowModelRepository.find({
      relations: [
        'WorkOrders',
        'ChannelMappingWipFlows',
        'WipFlowMappings',
        'Company',
        'Production',
      ],
    });
    return model;
  }

  async createWipFlow(createWipFlowDto: CreateWipFlowDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      production_id,
      ref_wip_flow_id,
      company_id,
      wip_flow_name,
      description,
      presentation_template,
      is_template,
      wip_id_map,
    } = createWipFlowDto;
    const model = new WipFlowModel();
    model.production_id = production_id;
    model.description = description;
    model.company_id = company_id;
    model.wip_flow_name = wip_flow_name;
    model.ref_wip_flow_id = ref_wip_flow_id;
    model.presentation_template = presentation_template;
    model.is_template = is_template;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    if (wip_id_map) {
      const wipFlow = await this.WipFlowModelRepository.findOne(model.id);
      const wip_flow_id = wipFlow.id;
      for (let i = 0; i < wip_id_map.length; i++) {
        const wip_sequence = i;
        const wip_id = wip_id_map[i];
        await this.createWipFlowMapping({ wip_id, wip_flow_id, wip_sequence });
      }
    }

    return model;
  }

  async updateWipFlow(id: number, updateWipFlowDto: UpdateWipFlowDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      production_id,
      ref_wip_flow_id,
      company_id,
      wip_flow_name,
      description,
      presentation_template,
      is_template,
      wip_id_map,
    } = updateWipFlowDto;

    await stateRunner.manager.update(WipFlowModel, id, {
      production_id,
      ref_wip_flow_id,
      company_id,
      wip_flow_name,
      description,
      presentation_template,
      is_template,
    });
    await stateRunner.cleanup();

    const wip_flow_id = id;
    // await this.WipFlowMappingModelRepository.createQueryBuilder()
    //   .delete()
    //   .from(WipFlowMappingModel)
    //   .where('wip_flow_id = :wip_flow_id', { wip_flow_id })
    //   .execute();
    const stateRunner2 = await new StateRunner(this.connection).start();
    const model = await this.WipFlowMappingModelRepository.find({
      where: { wip_flow_id },
      relations: ['WIPFlow', 'WIP'],
    });
    for (let i = 0; i < model.length; i++) {
      model[i].apply(WipTransition.DELETE, stateRunner2);
      await model[i].saveState();
    }
    await stateRunner2.cleanup();

    if (wip_id_map) {
      const wipFlow = await this.WipFlowModelRepository.findOne(id);
      const wip_flow_id = wipFlow.id;
      for (let i = 0; i < wip_id_map.length; i++) {
        const wip_sequence = i;
        const wip_id = wip_id_map[i];
        await this.createWipFlowMapping({ wip_id, wip_flow_id, wip_sequence });
      }
    }
  }

  async removeWipFlow(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.WipFlowModelRepository.findOne(id, {
        relations: ['', ''],
      });

      model.apply(WipFlowTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async findAllWipFlowMappingWhere(wip_flow_id: number) {
    const model = await this.WipFlowMappingModelRepository.find({
      where: { wip_flow_id: wip_flow_id },
      relations: ['WorkOrderItems', 'WIPFlow', 'WIP', 'WIP.WIPAssets'],
    });
    return model;
  }

  async removeWipFlowMapping(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.WipFlowMappingModelRepository.findOne(id, {
        relations: ['WIPFlow', 'WIP'],
      });

      model.apply(WipFlowMappingTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async createWipFlowMapping(createWipFlowMappingDto: CreateWipFlowMappingDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { wip_flow_id, wip_id, wip_sequence } = createWipFlowMappingDto;
    const model = new WipFlowMappingModel();
    model.wip_flow_id = wip_flow_id;
    model.wip_id = wip_id;
    model.wip_sequence = wip_sequence;

    await stateRunner.manager.save(model);
    model.apply(WipFlowMappingTransition.NEW, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();

    // return model;
  }

  //create order
  //create item from No. order get id order to create

  async processCreateWorkOrder(
    import_id: number,
    ref_wip_flow_id?: number,
    user?: UserModel,
  ) {
    const model = await this.ImportDataModelRepository.find({
      where: { import_id: import_id },
    });
    let wip_id: number[] = [];
    const modelWipFlow = await this.findOneWipFlow(ref_wip_flow_id);

    for (let i = 0; i < modelWipFlow.WipFlowMappings.length; i++) {
      wip_id.push(modelWipFlow.WipFlowMappings[i].wip_id);
    }
    const createWipFlowDto = {
      ref_wip_flow_id: modelWipFlow.id,
      company_id: modelWipFlow.company_id,
      wip_flow_name: 'Flow Copy From wip id: ' + modelWipFlow.id,
      is_template: false,
      wip_id_map: wip_id,
    };
    const newWipFlow = await this.createWipFlow(createWipFlowDto);
    for (let i = 0; i < model.length; i++) {
      if (model[i].sheet_name == 'C01') {
        var work: any = model[i].raw_data;
        for (let j = 0; j < work.length; j++) {
          if (work[j]['job_no'] != undefined) {
            const createWorkOrder = {
              workOrder_no: work[j]['job_no'],
              wip_flow_id: newWipFlow.id,
              prioritize: j,
              item: work[j],
              import_id: import_id,
              // this_sheet: model[i].sheet_name,
            };
            await this.createWorkOrder(createWorkOrder, user);
          }
        }
      }
    }

    //create workOrderItem
    for (let i = 0; i < model.length; i++) {
      var work: any = model[i].raw_data;
      let sheet_name = model[i].sheet_name;
      for (let j = 0; j < work.length; j++) {
        const item = work[j];
        const keys = Object.keys(item);
        const values = Object.values(item);
        console.log(item.job_no);
        const model_workOrder = await this.WorkOrderModelRepository.findOne({
          where: { workorder_no: item.job_no },
          relations: ['WIPFlow', 'WIPFlow.WipFlowMappings'],
        });
        console.log(model_workOrder.id);
        let wip_flow_mapping_id = null;
        if (sheet_name == 'C01') {
          const wip_name = 'ลูกฟูก';
          const model_wip = await this.WipModelRepository.findOne({
            where: { name: wip_name },
          });
          if (model_wip) {
            const wipFlowMap = model_workOrder.WIPFlow.WipFlowMappings;
            for (let i = 0; i < wipFlowMap.length; i++) {
              if (wipFlowMap[i].wip_id === model_wip.id) {
                wip_flow_mapping_id = wipFlowMap[i].id;
              }
            }
          } else {
            wip_flow_mapping_id = null;
          }
        }
        if (sheet_name == 'D21' || sheet_name == 'D27') {
          const wip_name = 'ไดคัท';
          const model_wip = await this.WipModelRepository.findOne({
            where: { name: wip_name },
          });
          if (model_wip) {
            const wipFlowMap = model_workOrder.WIPFlow.WipFlowMappings;
            for (let i = 0; i < wipFlowMap.length; i++) {
              if (wipFlowMap[i].wip_id === model_wip.id) {
                wip_flow_mapping_id = wipFlowMap[i].id;
              }
            }
          } else {
            wip_flow_mapping_id = null;
          }
        }
        if (sheet_name == 'P03' || sheet_name == 'P74') {
          const wip_name = 'ปริ้นติ้ง';
          const model_wip = await this.WipModelRepository.findOne({
            where: { name: wip_name },
          });
          if (model_wip) {
            const wipFlowMap = model_workOrder.WIPFlow.WipFlowMappings;
            for (let i = 0; i < wipFlowMap.length; i++) {
              if (wipFlowMap[i].wip_id === model_wip.id) {
                wip_flow_mapping_id = wipFlowMap[i].id;
              }
            }
          } else {
            wip_flow_mapping_id = null;
          }
        }
        if (sheet_name == 'S01' || sheet_name == 'S02') {
          const wip_name = 'สลิตเตอร์';
          const model_wip = await this.WipModelRepository.findOne({
            where: { name: wip_name },
          });
          if (model_wip) {
            const wipFlowMap = model_workOrder.WIPFlow.WipFlowMappings;
            for (let i = 0; i < wipFlowMap.length; i++) {
              if (wipFlowMap[i].wip_id === model_wip.id) {
                wip_flow_mapping_id = wipFlowMap[i].id;
              }
            }
          } else {
            wip_flow_mapping_id = null;
          }
        }
        if (sheet_name == 'B01') {
          const wip_name = 'บล็อค';
          const model_wip = await this.WipModelRepository.findOne({
            where: { name: wip_name },
          });
          if (model_wip) {
            const wipFlowMap = model_workOrder.WIPFlow.WipFlowMappings;
            for (let i = 0; i < wipFlowMap.length; i++) {
              if (wipFlowMap[i].wip_id === model_wip.id) {
                wip_flow_mapping_id = wipFlowMap[i].id;
              }
            }
          } else {
            wip_flow_mapping_id = null;
          }
        }

        const wip = await this.WipModelRepository.findOne({
          where: { name: 'ลูกฟูก' },
          relations: [
            'WIPAssets',
            'WipFlowMappings',
            'ChannelMappingWips',
            'Company',
          ],
        });

        //wip flow_mapping_id เอามาตรวจสอบว่า workOrder_item นี้อยู่ wip ไหน เพื่อที่จะรู้ว่าต้องใช้ field อะไรบ้าง
        const field_default: any = wip.field_default;
        for (let l = 0; l < field_default.length; l++) {
          let import_key = wip.field_default[l].import_key;

          //เอา field_default.import_key มาเปรียบเทียบกับ item json ว่ามีชื่ออันไหนที่ตรงกัน แล้วเอา value มาสร้าง workOrder_item
          for (let m = 0; m < keys.length; m++) {
            if (import_key == keys[m]) {
              const field_name = keys[m];
              const field_value: any = values[m];

              const createWorkOrderItem: CreateWorkOrderItemDto = {
                workOrder_id: model_workOrder.id,
                wip_flow_mapping_id: wip_flow_mapping_id,
                import_id: import_id,
                field_name,
                field_value,
                asset_cancel_count: 0,
              };

              await this.createWorkOrderItem(createWorkOrderItem, user);
            }
          }
          if (import_key == '') {
            if (wip.field_default[l].name == 'this_asset') {
              const createWorkOrderItem: CreateWorkOrderItemDto = {
                workOrder_id: model_workOrder.id,
                wip_flow_mapping_id: wip_flow_mapping_id,
                import_id: import_id,
                field_name: wip.field_default[l].name,
                field_value: model[i].sheet_name,
                asset_cancel_count: 0,
              };
              await this.createWorkOrderItem(createWorkOrderItem, user);
            } else {
              const createWorkOrderItem: CreateWorkOrderItemDto = {
                workOrder_id: model_workOrder.id,
                wip_flow_mapping_id: wip_flow_mapping_id,
                import_id: import_id,
                field_name: wip.field_default[l].name,
                field_value: null,
                asset_cancel_count: 0,
              };
              await this.createWorkOrderItem(createWorkOrderItem, user);
            }
          }
        }
      }
    }

    //map WOItem And Customer
    const modelWorkOrder = await this.findAllWorkOrder();
    for (let i = 0; i < modelWorkOrder.length; i++) {
      const modelWO: any = await this.findOneWorkOrder(modelWorkOrder[i].id);

      for (let j = 0; j < modelWO.WorkOrderItems.length; j++) {
        if (modelWO.WorkOrderItems[j].field_name === 'mc_no') {
          const mc_no = modelWO.WorkOrderItems[j].field_value;
          const modelCus =
            await this.CompanyManagementService.findOneCustomerWhere(mc_no);
          if (modelCus) {
            const field = modelCus.raw_data;

            if (field['ink1']) {
              const items: any = await this.WorkOrderItemModelRepository.find({
                where: { workorder_id: modelWorkOrder[i].id },
              });

              for (let i = 0; i < items.length; i++) {
                if (items[i].field_name === 'ink_1') {
                  const id = items[i].id;
                  console.log(id);

                  const stateRunner = await new StateRunner(
                    this.connection,
                  ).start();
                  await stateRunner.manager.update(WorkOrderItemModel, id, {
                    field_value: field['ink1'],
                  });
                  await stateRunner.cleanup();
                }
                if (items[i].field_name === 'ink_2') {
                  const id = items[i].id;
                  const stateRunner = await new StateRunner(
                    this.connection,
                  ).start();
                  await stateRunner.manager.update(WorkOrderItemModel, id, {
                    field_value: field['ink2'],
                  });
                  await stateRunner.cleanup();
                }
                if (items[i].field_name === 'ink_3') {
                  const id = items[i].id;
                  const stateRunner = await new StateRunner(
                    this.connection,
                  ).start();
                  await stateRunner.manager.update(WorkOrderItemModel, id, {
                    field_value: field['ink3'],
                  });
                  await stateRunner.cleanup();
                }
                if (items[i].field_name === 'ink_4') {
                  const id = items[i].id;
                  const stateRunner = await new StateRunner(
                    this.connection,
                  ).start();
                  await stateRunner.manager.update(WorkOrderItemModel, id, {
                    field_value: field['ink4'],
                  });
                  await stateRunner.cleanup();
                }
              }
            }

            if (field['typeItem']) {
              const items: any = await this.WorkOrderItemModelRepository.find({
                where: { workorder_id: modelWorkOrder[i].id },
              });

              for (let i = 0; i < items.length; i++) {
                if (items[i].field_name === 'typeItem') {
                  const id = items[i].id;
                  const stateRunner = await new StateRunner(
                    this.connection,
                  ).start();
                  await stateRunner.manager.update(WorkOrderItemModel, id, {
                    field_value: field['typeItem'],
                  });
                  await stateRunner.cleanup();
                }
              }
            }
          }
        }
      }
    }

    const stateRunner = await new StateRunner(this.connection).start();
    const modelImport = await this.ImportModelRepository.findOne(import_id);
    modelImport.apply(ImportTransition.CO_COMPLETE_PROCESS, stateRunner);
    await modelImport.saveState();
    await stateRunner.cleanup();
  }

  async createWorkOrder(
    createWorkOrderDto: CreateWorkOrderDto,
    user: UserModel,
  ) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      workOrder_no,
      production_id,
      wip_flow_id,
      prioritize,
      item,
      import_id,
      copy_ref,
      // this_sheet,
      // field_value,
    } = createWorkOrderDto;
    const model = new WorkOrderModel();
    model.workorder_no = workOrder_no;
    model.production_id = production_id;
    model.wip_flow_id = wip_flow_id;
    model.prioritize = prioritize;
    model.copy_ref = copy_ref ? copy_ref : null;
    model.CreateBy = user;
    // model.field_value = field_value;
    await stateRunner.manager.save(model);
    model.apply(WorkOrderTransition.CO_CREATE, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();

    // if (item) {
    //   const keys = Object.keys(item);
    //   //เอา wip_flow_id มาหา wip_flow_mapping ว่ามี wip อะไรบ้าง

    //   const wip_flow_mapping = await this.findAllWipFlowMappingWhere(
    //     wip_flow_id,
    //   );
    //   // let this_asset = this_sheet;
    //   for (let i = 0; i < wip_flow_mapping.length; i++) {
    //     const wip_flow_mapping_id = wip_flow_mapping[i].id;
    //     const wip_id = wip_flow_mapping[i].wip_id;
    //     const wip = await this.findOneWip(wip_id);

    //     //wip flow_mapping_id เอามาตรวจสอบว่า workOrder_item นี้อยู่ wip ไหน เพื่อที่จะรู้ว่าต้องใช้ field อะไรบ้าง
    //     const field_default: any = wip.field_default;
    //     for (let j = 0; j < field_default.length; j++) {
    //       let import_key = wip.field_default[j].import_key;

    //       //เอา field_default.import_key มาเปรียบเทียบกับ item json ว่ามีชื่ออันไหนที่ตรงกัน แล้วเอา value มาสร้าง workOrder_item
    //       for (let k = 0; k < keys.length; k++) {
    //         if (import_key == keys[k]) {
    //           const field_name = keys[k];
    //           const field_value: any = Object.values(item)[k];

    //           const createWorkOrderItem: CreateWorkOrderItemDto = {
    //             workOrder_id: model.id,
    //             wip_flow_mapping_id,
    //             // remark_by,
    //             // remark,
    //             import_id: import_id,
    //             field_name,
    //             field_value,
    //             asset_cancel_count: 0,
    //           };

    //           await this.createWorkOrderItem(createWorkOrderItem);
    //         }
    //       }
    //       if (!import_key) {
    //         const createWorkOrderItem: CreateWorkOrderItemDto = {
    //           workOrder_id: model.id,
    //           wip_flow_mapping_id,
    //           // remark_by,
    //           // remark,
    //           import_id: import_id,
    //           field_name: wip.field_default[j].name,
    //           field_value: null,
    //           asset_cancel_count: 0,
    //         };
    //         await this.createWorkOrderItem(createWorkOrderItem);
    //       }
    //     }
    //   }
    // }

    return model;
  }

  async findAllWorkOrder() {
    const model = await this.WorkOrderModelRepository.find({
      relations: [
        'Production',
        'WIPFlow',
        'WorkOrderItems',
        'WorkOrderItems.WipFlowMapping',
        'WorkOrderItems.WipFlowMapping.WIP',
        'WorkOrderItems.WipFlowMapping.WIPFlow',
      ],
      order: {
        prioritize: 'ASC',
      },
    });

    return model;
  }

  async findOneWorkOrder(id: number) {
    const model = await this.WorkOrderModelRepository.findOne(id, {
      relations: [
        'Production',
        'WIPFlow',
        'WorkOrderItems',
        'WorkOrderItems.WipFlowMapping',
        'WorkOrderItems.WipFlowMapping.WIP',
        'WorkOrderItems.WipFlowMapping.WIPFlow',
      ],
      order: {
        prioritize: 'ASC',
      },
    });

    return model;
  }

  async findAllWorkOrderItem_wip(id: number) {
    const model = await this.WorkOrderItemModelRepository.find({
      where: { wip_flow_mapping_id: id },
      relations: [
        'Messages',
        'Import',
        'WorkOrder',
        'WipFlowMapping',
        'WipFlowMapping.WIP',
        'WipFlowMapping.WIPFlow',
      ],
    });

    return model;
  }

  // async findAllWorkOrderItemByWip(id: number) {
  //   var start = +new Date(); // log start timestamp
  //   console.log(start);

  //   const workOrder: any = await this.findAllWorkOrder();
  //   let data = [];
  //   let dataItem = {};
  //   for (let i = 0; i < workOrder.length; i++) {
  //     const items = await this.WorkOrderItemModelRepository.find({
  //       where: { workorder_id: workOrder[i].id },
  //       relations: ['WipFlowMapping', 'WipFlowMapping.WIP'],
  //     });
  //     for (let j = 0; j < items.length; j++) {
  //       if (items[j].WipFlowMapping !== null) {
  //         if (items[j].WipFlowMapping.wip_id == id) {
  //           dataItem['workorder_id'] = workOrder[i].id;
  //           let workOrderItem_id = [];
  //           for (let k = 0; k < workOrder[i].WorkOrderItems.length; k++) {
  //             workOrderItem_id.push(workOrder[i].WorkOrderItems[k].id);
  //           }
  //           dataItem['workorder_item_id'] = workOrderItem_id;
  //           //จัดเรียงข้อมูล
  //           dataItem[items[j].field_name] = items[j].field_value;
  //           dataItem['state_wo'] = workOrder[i].state;
  //           dataItem['state'] = items[j].state;
  //           dataItem['wip_flow_mapping_id'] = items[j].wip_flow_mapping_id;
  //         }
  //       }
  //     }

  //     if (dataItem['workorder_id']) {
  //       // console.log(dataItem);

  //       data.push(dataItem);
  //       dataItem = {};
  //     }
  //   }
  //   var end = +new Date(); // log end timestamp
  //   var diff = end - start;
  //   console.log(diff);

  //   return data;
  // }

  async findAllWorkOrderByWip(id: number, body: FindAllWorkOrderByWipDto) {
    const { date, condition } = body;
    //condition วันที่ import / วันที่ต้องส่ง
    var start = +new Date(); // log start timestamp
    console.log(start);
    console.log(condition);
    console.log(date);

    let data = [];
    let dataItem = {};
    let workOrderItem_id = [];
    const dateNow = new Date();
    const today = dateNow.toISOString().substring(0, 10);
    console.log(today);

    // return data;

    if (condition === 'created_at') {
      const wipFlowMapping: any = await this.WipFlowMappingModelRepository.find(
        {
          where: { wip_id: id, created_at: Like(`%${date}%`) },
          relations: [
            'WIPFlow',
            'WIPFlow.WorkOrders',
            'WIPFlow.WorkOrders.WorkOrderItems',
          ],
        },
      );
      for (let i = 0; i < wipFlowMapping.length; i++) {
        const wo = wipFlowMapping[i].WIPFlow.WorkOrders;
        if (wo.length > 0) {
          for (let j = 0; j < wo.length; j++) {
            const workOrder = await wo[j];
            const workOrderItems = await wo[j].WorkOrderItems;
            for (let k = 0; k < workOrderItems.length; k++) {
              if (
                workOrderItems[k].wip_flow_mapping_id == wipFlowMapping[i].id
              ) {
                const workOrderItem = await workOrderItems[k];

                dataItem['workorder_id'] = workOrder.id;
                dataItem['prioritize'] = workOrder.prioritize;
                workOrderItem_id.push(workOrderItem.id);
                dataItem['workorder_item_id'] = workOrderItem_id;

                dataItem[workOrderItem.field_name] = workOrderItem.field_value;
                dataItem['state_wo'] = workOrder.state;
                dataItem['state'] = workOrderItem.state;
                dataItem['wip_flow_mapping_id'] = wipFlowMapping[i].id;
              }
            }
            if (dataItem['workorder_id']) {
              workOrderItem_id = [];
              data.push(dataItem);
              dataItem = {};
            }
          }
        }
      }

      var end = +new Date(); // log end timestamp
      var diff = end - start;
      data.sort((a, b) => {
        return a.prioritize - b.prioritize;
      });
      console.log(diff);
      return data;
    } else if (condition === 'date_ex') {
      const wipFlowMapping: any = await this.WipFlowMappingModelRepository.find(
        {
          where: { wip_id: id },
          relations: [
            'WIPFlow',
            'WIPFlow.WorkOrders',
            'WIPFlow.WorkOrders.WorkOrderItems',
          ],
        },
      );
      for (let i = 0; i < wipFlowMapping.length; i++) {
        const wo = wipFlowMapping[i].WIPFlow.WorkOrders;
        if (wo.length > 0) {
          for (let j = 0; j < wo.length; j++) {
            const workOrder = await wo[j];
            const workOrderItems = await wo[j].WorkOrderItems;
            for (let k = 0; k < workOrderItems.length; k++) {
              if (
                workOrderItems[k].wip_flow_mapping_id == wipFlowMapping[i].id
              ) {
                const workOrderItem = await workOrderItems[k];

                dataItem['workorder_id'] = workOrder.id;
                dataItem['prioritize'] = workOrder.prioritize;
                workOrderItem_id.push(workOrderItem.id);
                dataItem['workorder_item_id'] = workOrderItem_id;

                dataItem[workOrderItem.field_name] = workOrderItem.field_value;
                dataItem['state_wo'] = workOrder.state;
                dataItem['state'] = workOrderItem.state;
                dataItem['wip_flow_mapping_id'] = wipFlowMapping[i].id;
              }
            }
            if (dataItem['workorder_id']) {
              workOrderItem_id = [];
              data.push(dataItem);
              dataItem = {};
            }
          }
        }
      }

      var end = +new Date(); // log end timestamp
      var diff = end - start;
      data.sort((a, b) => {
        return a.prioritize - b.prioritize;
      });
      var newData = data.filter(function (obj) {
        return obj.date_pro == date;
      });
      for (let index = 0; index < newData.length; index++) {
        console.log(newData[index].workorder_id);
        console.log(newData[index].date_pro);
      }
      return newData;
    }
  }

  async prioritizeWorkOrder(prioritize: any) {
    const stateRunner = await new StateRunner(this.connection).start();
    const baseModel = await this.WorkOrderModelRepository.find({
      order: {
        prioritize: 'ASC',
      },
      // where: { id: Not(prioritizeId) },
    });

    for (let i = 0; i < baseModel.length; i++) {
      for (let j = 0; j < prioritize.id.length; j++) {
        if (prioritize.id[j] === baseModel[i].id) {
          await stateRunner.manager.update(WorkOrderModel, baseModel[i].id, {
            prioritize: prioritize.rowIndex[j],
          });
        }
      }
    }
    await stateRunner.cleanup();
  }

  async updateWorkOrder(id: number, updateWorkOrderDto: UpdateWorkOrderDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      workOrder_no,
      production_id,
      wip_flow_id,
      prioritize,
      // field_value,
    } = updateWorkOrderDto;

    await stateRunner.manager.update(WorkOrderModel, id, {
      workorder_no: workOrder_no,
      production_id,
      wip_flow_id,
      prioritize,
      // field_value,
    });
    await stateRunner.cleanup();
  }

  async createWorkOrderItem(
    createWorkOrderItemDto: CreateWorkOrderItemDto,
    user: UserModel,
  ) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      workOrder_id,
      wip_flow_mapping_id,
      remark_by,
      remark,
      import_id,
      field_name,
      field_value,
      asset_cancel_count,
    } = createWorkOrderItemDto;
    const model = new WorkOrderItemModel();
    model.workorder_id = workOrder_id;
    model.wip_flow_mapping_id = wip_flow_mapping_id;
    model.remark_by = remark_by;
    model.remark = remark;
    model.field_name = field_name;
    model.field_value = field_value;
    model.import_id = import_id;
    model.asset_cancel_count = asset_cancel_count;
    model.CreateBy = user;
    await stateRunner.manager.save(model);
    model.apply(WorkOrderItemTransition.CO_CREATE, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();
    return model;
  }

  async createProduction(createProductionDto: CreateProductionDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      import_id,
      create_by,
      company_id,
      master_no,
      customer_id,
      description,
      quantity,
      workOrder_no,
      workOrder_code,
      order_date,
      due_date,
      author,
      seller,
      md5_dataVersion,
    } = createProductionDto;
    const model = new ProductionModel();
    model.import_id = import_id;
    model.createdBy = create_by;
    model.company_id = company_id;
    model.master_no = master_no;
    model.customer_id = customer_id;
    model.description = description;
    model.quantity = quantity;
    model.workOrder_no = workOrder_no;
    model.workOrder_code = workOrder_code;
    model.order_date = order_date;
    model.due_date = due_date;
    model.author = author;
    model.seller = seller;
    model.md5_dataVersion = md5_dataVersion;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
    return model;
  }

  async updateProduction(id: number, updateProductionDto: UpdateProductionDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      import_id,
      create_by,
      company_id,
      master_no,
      customer_id,
      description,
      quantity,
      workOrder_no,
      workOrder_code,
      order_date,
      due_date,
      author,
      seller,
      md5_dataVersion,
    } = updateProductionDto;

    await stateRunner.manager.update(ProductionModel, id, {
      import_id,
      createdBy: create_by,
      company_id,
      master_no,
      customer_id,
      description,
      quantity,
      workOrder_no,
      workOrder_code,
      order_date,
      due_date,
      author,
      seller,
      md5_dataVersion,
    });
    await stateRunner.cleanup();
  }

  async updateWorkOrderItemType(id: number, options) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { typeItem, mc_no } = options;
    const modelWorkOrderItem = await this.WorkOrderItemModelRepository.findOne({
      where: { workorder_id: id, field_name: 'typeItem' },
    });
    await stateRunner.manager.update(
      WorkOrderItemModel,
      modelWorkOrderItem.id,
      {
        field_value: typeItem,
      },
    );
    await stateRunner.cleanup();

    if (mc_no) {
      const stateRunner = await new StateRunner(this.connection).start();
      const modelCustomer = await this.CustomerModelRepository.findOne({
        where: { customer_no: mc_no },
      });
      if (modelCustomer) {
        const update_raw_data = modelCustomer.raw_data;
        update_raw_data['typeItem'] = typeItem;

        await stateRunner.manager.update(CustomerModel, modelCustomer.id, {
          raw_data: update_raw_data,
        });
      }

      await stateRunner.cleanup();
    }
  }

  async updateWorkOrderItemNextAsset(id: number, options) {
    const { job_no, new_send, old_send } = options;
    const stateRunner = await new StateRunner(this.connection).start();
    const modelWorkOrderItem = await this.WorkOrderItemModelRepository.findOne({
      where: { workorder_id: id, field_name: 'c_send' },
    });
    await stateRunner.manager.update(
      WorkOrderItemModel,
      modelWorkOrderItem.id,
      {
        field_value: new_send,
      },
    );
    await stateRunner.cleanup();

    if (old_send) {
      const stateRunner = await new StateRunner(this.connection).start();
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: {
            workorder_id: id,
            field_name: 'this_asset',
            field_value: old_send,
          },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: new_send,
        },
      );
      await stateRunner.cleanup();
    }
  }

  async updateWorkOrderItemDetail(id: number, options) {
    const {
      detail,
      _in,
      _out,
      meter_m,
      p,
      q,
      plan_start_time,
      plan_start_time_real,
      plan_finish_time,
      plan_finish_time_real,
      time,
      speed,
      setup,
      setup_time,
      setup_reason,
      date_due,
    } = options;
    const stateRunner = await new StateRunner(this.connection).start();
    if (date_due) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'date_pro' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: date_due,
        },
      );
    }

    if (plan_start_time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'plan_start_time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: plan_start_time,
        },
      );
    }
    if (detail) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'desc_name' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: detail,
        },
      );
    }
    if (_in) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'in' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: _in,
        },
      );
    }
    if (_out) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'out' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: _out,
        },
      );
    }
    if (meter_m) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'meter_m' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: meter_m,
        },
      );
    }
    if (setup_time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'setup_time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: setup_time,
        },
      );
    }
    if (setup) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'setup' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: setup,
        },
      );
    }
    if (speed) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'speed' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: speed,
        },
      );
    }
    if (time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: time,
        },
      );
    }
    if (plan_finish_time_real) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'plan_finish_time_real' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: plan_finish_time_real,
        },
      );
    }
    if (plan_finish_time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'plan_finish_time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: plan_finish_time,
        },
      );
    }
    if (plan_start_time_real) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'plan_start_time_real' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: plan_start_time_real,
        },
      );
    }
    if (q) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'q' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: q,
        },
      );
    }
    if (p) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'p' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: p,
        },
      );
    }
    if (setup_reason) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: id, field_name: 'setup_reason' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: setup_reason,
        },
      );
    }

    await stateRunner.cleanup();

    if (plan_finish_time) {
      const modelAllWo = await this.findAllWorkOrder();
      let arrWo = [];
      for (let i = 0; i < modelAllWo.length; i++) {
        arrWo.push(modelAllWo[i].id);
      }
      const arrWoSlice = arrWo.slice(arrWo.indexOf(id));
      console.log(arrWoSlice);

      for (let i = 1; i < arrWoSlice.length; i++) {
        const modelWo_prev = await this.findOneWorkOrder(arrWoSlice[i - 1]);

        if (modelWo_prev) {
          console.log(modelWo_prev.id);

          const modelWo_prev_speed =
            await this.WorkOrderItemModelRepository.findOne({
              where: { workorder_id: modelWo_prev.id, field_name: 'speed' },
            });
          const modelWo_prev_plan_finish_time =
            await this.WorkOrderItemModelRepository.findOne({
              where: {
                workorder_id: modelWo_prev.id,
                field_name: 'plan_finish_time',
              },
            });

          const speed = modelWo_prev_speed.field_value;
          const plan_finish_time = modelWo_prev_plan_finish_time.field_value;
          const value = { speed, plan_finish_time };
          const modelWo = await this.findOneWorkOrder(arrWoSlice[i]);

          await this.updateWoTimeAuto(modelWo.id, value);
        } else {
          console.log('ไม่เจอ');
        }
      }
    }
  }

  async updateWoTimeAuto(wo_id: number, value: any) {
    const { speed, plan_finish_time } = value;
    const stateRunner = await new StateRunner(this.connection).start();
    const meter_m: any = await this.WorkOrderItemModelRepository.findOne({
      where: { workorder_id: wo_id, field_name: 'meter_m' },
    });

    ///cal time
    const m = Math.ceil(meter_m.field_value / speed) + 2;
    const h = Math.round(m / 60);
    const hDisplay = h > 0 && h >= 10 ? h + ':' : '0' + h + ':';
    const mSub = h > 0 && m >= 60 ? m - 60 : m;
    const mDisplay = mSub > 0 && mSub >= 10 ? mSub : '0' + mSub;
    const time = hDisplay + mDisplay;

    ///cal planTimeFinish
    const mEnd = mSub % 60;
    const hEnd = h * 60;
    const timeend = mEnd + hEnd;

    const hour = plan_finish_time.substring(0, 2);
    const minute = plan_finish_time.substring(3);

    const mnEnd = minute % 60;
    const hrEnd = hour * 60;
    const timeendsub = mnEnd + hrEnd;

    const timeEnd = timeend + timeendsub;
    var hsub = Math.floor(timeEnd / 60);
    var msub = timeEnd % 60;

    const hhSub = hsub >= 24 ? hsub - 24 : hsub;
    const Hours = hhSub > 0 && hhSub >= 10 ? hhSub : '0' + hhSub;
    const mmSub = hsub > 0 && msub >= 60 ? msub - 60 : msub;
    const minutes = mmSub > 0 && mmSub >= 10 ? mmSub : '0' + mmSub;

    const timeFinish = Hours + ':' + minutes;
    const total = hsub + msub - 0;

    if (speed) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'speed' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: speed,
        },
      );
    }
    if (plan_finish_time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'plan_start_time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: plan_finish_time,
        },
      );
    }
    if (time) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: time,
        },
      );
    }
    if (timeFinish) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'plan_finish_time' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: timeFinish,
        },
      );
    }

    await stateRunner.cleanup();
  }

  async updateWoItemStart(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const { wo_item_id, wip_flow_mapping_id, asset_name } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.START, stateRunner);
      await modelAsset.saveState();
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_START, stateRunner);
        await model.saveState();
      }
    }

    await stateRunner.cleanup();
  }

  async updateWoItemStop(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const { wo_item_id, wip_flow_mapping_id, asset_name } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.STOP, stateRunner);
      await modelAsset.saveState();
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_STOP, stateRunner);
        await model.saveState();
      }
    }

    await stateRunner.cleanup();
  }

  async updateWoItemResume(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const { wo_item_id, wip_flow_mapping_id, asset_name } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.RESUME, stateRunner);
      await modelAsset.saveState();
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_RESUME, stateRunner);
        await model.saveState();
      }
    }

    await stateRunner.cleanup();
  }

  async updateWoItemCancel(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const { wo_item_id, wip_flow_mapping_id, asset_name, note } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.FINISH, stateRunner);
      await modelAsset.saveState();
    }

    if (note) {
      await stateRunner.manager.update(WorkOrderModel, wo_id, {
        note,
      });
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_CANCEL, stateRunner);
        await model.saveState();
      }
    }

    await stateRunner.cleanup();
  }

  async updateWoItemRetrieve(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const { wo_item_id, wip_flow_mapping_id, asset_name, note } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.START, stateRunner);
      await modelAsset.saveState();
    }

    if (note) {
      await stateRunner.manager.update(WorkOrderModel, wo_id, {
        note,
      });
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_RETRIEVE, stateRunner);
        await model.saveState();
      }
    }

    await stateRunner.cleanup();
  }

  async updateWoItemFinish(wo_id: number, woItemStart: WoItemStart) {
    const stateRunner = await new StateRunner(this.connection).start();

    const {
      wo_item_id,
      wip_flow_mapping_id,
      asset_name,
      finish_good_emp,
      finish_good_asset,
      fail_good_emp,
      fail_good_asset,
    } = woItemStart;

    if (asset_name) {
      const modelAsset = await this.AssetModelRepository.findOne({
        where: { asset_name },
      });

      await stateRunner.manager.save(modelAsset);
      modelAsset.apply(AssetTransition.FINISH, stateRunner);
      await modelAsset.saveState();
    }

    for (let i = 0; i < wo_item_id.length; i++) {
      const IdWoItem = wo_item_id[i];
      const model: any = await this.WorkOrderItemModelRepository.findOne({
        where: {
          workorder_id: wo_id,
          id: IdWoItem,
          wip_flow_mapping_id: wip_flow_mapping_id,
        },
        relations: ['WorkOrder'],
      });

      if (model) {
        await stateRunner.manager.save(model);
        model.apply(WorkOrderItemTransition.CO_FINISH, stateRunner);
        await model.saveState();
      }
    }

    if (finish_good_emp) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'finish_good_emp' },
        });

      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: String(finish_good_emp),
        },
      );
    }
    if (finish_good_asset) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'finish_good_asset' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: String(finish_good_asset),
        },
      );
    }
    if (fail_good_emp) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'fail_good_emp' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: String(fail_good_emp),
        },
      );
    }
    if (fail_good_asset) {
      const modelWorkOrderItem =
        await this.WorkOrderItemModelRepository.findOne({
          where: { workorder_id: wo_id, field_name: 'fail_good_asset' },
        });
      await stateRunner.manager.update(
        WorkOrderItemModel,
        modelWorkOrderItem.id,
        {
          field_value: String(fail_good_asset),
        },
      );
    }

    await stateRunner.cleanup();

    const modelFinish = await this.WorkOrderItemModelRepository.find({
      where: {
        workorder_id: wo_id,
      },
      relations: ['WorkOrder'],
    });

    if (modelFinish.length == 0) {
      const stateRunner = await new StateRunner(this.connection).start();
      const modelWorkOrder = await this.findOneWorkOrder(wo_id);

      modelWorkOrder.apply(WorkOrderTransition.CO_COMPLETE, stateRunner);
      await modelWorkOrder.saveState();
      await stateRunner.cleanup();
    }
  }

  async copyWorkOrder(id: number, user: UserModel) {
    const modelWorkOrder = await this.WorkOrderModelRepository.find({
      where: { copy_ref: id },
      order: { id: 'DESC' },
    });
    if (modelWorkOrder[0]) {
      let WorkOrderNoOld = modelWorkOrder[0].workorder_no;
      let WorkOrderNoNewSub = modelWorkOrder[0].workorder_no.substring(0, 8);

      let num = Number(WorkOrderNoOld.substring(16, 15)) + 1;
      const newWorkOrderNo = WorkOrderNoNewSub + ' (copy ' + num + ')';
      const createWorkOrder = {
        workOrder_no: newWorkOrderNo,
        wip_flow_id: modelWorkOrder[0].wip_flow_id,
        prioritize: modelWorkOrder[0].prioritize + 0.1,
        copy_ref: id,
      };

      const model = await this.createWorkOrder(createWorkOrder, user);

      const modelWoItem = await this.WorkOrderItemModelRepository.find({
        where: { workorder_id: id },
      });
      for (let i = 0; i < modelWoItem.length; i++) {
        const createWorkOrderItem: CreateWorkOrderItemDto = {
          workOrder_id: model.id,
          wip_flow_mapping_id: modelWoItem[i].wip_flow_mapping_id,
          import_id: modelWoItem[i].import_id,
          field_name: modelWoItem[i].field_name,
          field_value:
            modelWoItem[i].field_name == 'job_no'
              ? model.workorder_no
              : modelWoItem[i].field_value,
          asset_cancel_count: 0,
        };
        await this.createWorkOrderItem(createWorkOrderItem, user);
      }
    } else {
      const modelWorkOrder = await this.WorkOrderModelRepository.findOne(id);
      const newWorkOrderNo = modelWorkOrder.workorder_no + ' (copy ' + 1 + ')';
      const createWorkOrder = {
        workOrder_no: newWorkOrderNo,
        wip_flow_id: modelWorkOrder.wip_flow_id,
        prioritize: modelWorkOrder.prioritize + 0.1,
        copy_ref: id,
      };

      const model = await this.createWorkOrder(createWorkOrder, user);
      console.log(model.id);
      const modelWoItem = await this.WorkOrderItemModelRepository.find({
        where: { workorder_id: id },
      });
      for (let i = 0; i < modelWoItem.length; i++) {
        const createWorkOrderItem: CreateWorkOrderItemDto = {
          workOrder_id: model.id,
          wip_flow_mapping_id: modelWoItem[i].wip_flow_mapping_id,
          import_id: modelWoItem[i].import_id,
          field_name: modelWoItem[i].field_name,
          field_value:
            modelWoItem[i].field_name == 'job_no'
              ? model.workorder_no
              : modelWoItem[i].field_value,
          asset_cancel_count: 0,
        };
        await this.createWorkOrderItem(createWorkOrderItem, user);
      }
    }
  }

  async getValueSensorSuccess(wip_flow_mapping_id: number) {
    //todo ส่งชื่อ asset มาหา device
    const model = await this.WipFlowMappingModelRepository.findOne(
      wip_flow_mapping_id,
      {
        relations: [
          'WorkOrderItems',
          'WIPFlow',
          'WIP',
          'WIP.WIPAssets',
          'WIP.WIPAssets.AssetMappingDevices',
          'WIP.WIPAssets.AssetMappingDevices.Device',
          'WIP.WIPAssets.AssetMappingDevices.Device.DeviceFields',
        ],
      },
    );
    const DeviceFields =
      model.WIP.WIPAssets[0].AssetMappingDevices[0]?.Device?.DeviceFields;
    let data = [];
    let dataItem = {};

    if (DeviceFields) {
      for (let i = 0; i < DeviceFields.length; i++) {
        dataItem[DeviceFields[i].field_name] = DeviceFields[i].number_value;
      }
      data.push(dataItem);
      dataItem = {};
    }
    return data;
  }
}
