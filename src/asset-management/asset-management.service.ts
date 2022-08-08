import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetModel } from './entities/asset.entity';
import { StateRunner } from 'src/share/lib/state-runner';
import { AssetMappingDeviceModel } from './entities/asset_mapping_device.entity';
import { DeviceModel } from './entities/device.entity';
import { AssetTransition } from 'src/state/asset-management/asset-state';
import { CompanyManagementService } from 'src/company-management/company-management.service';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { TriggerModel } from './entities/trigger.entity';
import { CreateConditionTypeDto } from './dto/create-condition_type.dto';
import { ConditionTypeModel } from './entities/condition_type.entity';
import { TriggerTransition } from 'src/state/asset-management/trigger-state';
import { DeviceManagementService } from 'src/device-management/device-management.service';
import { AssetMappingDeviceTransition } from 'src/state/asset-management/asset_mapping_device-state';
import { CreateAssetMappingDeviceDto } from './dto/create-assetMappingDevice.dto';
import { UpdateTriggerDto } from './dto/update-trigger.dto';
import { WorkOrderModel } from 'src/production-planning-management/entities';

@Injectable()
export class AssetManagementService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(AssetModel)
    private readonly AssetModelRepository: Repository<AssetModel>,

    @InjectRepository(AssetMappingDeviceModel)
    private readonly AssetMappingDeviceModelRepository: Repository<AssetMappingDeviceModel>,

    @InjectRepository(DeviceModel)
    private readonly DeviceModelRepository: Repository<DeviceModel>,

    @InjectRepository(TriggerModel)
    private readonly TriggerModelRepository: Repository<TriggerModel>,

    private readonly companyManagementService: CompanyManagementService,

    private readonly deviceManagementService: DeviceManagementService,
  ) {}

  async createAsset(createAssetDto: CreateAssetDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { asset_name, description, company_id, wip_id, device_id } =
      createAssetDto;
    const model = new AssetModel();
    model.asset_name = asset_name;
    model.description = description;

    const company = await this.companyManagementService.findAllCompanyActive();
    for (let i = 0; i < company.length; i++) {
      if (company_id == company[i].id) {
        model.company_id = company_id;
        break;
      }
    }

    model.wip_id = wip_id;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    if (device_id) {
      for (let i = 0; i < device_id.length; i++) {
        const asset_id = model.id;
        const options = {
          asset_id,
          device_id: device_id[i],
        };
        await this.createAssetMappingDevice(options);
      }
    }
  }

  async updateAsset(id: number, updateAssetDto: UpdateAssetDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { asset_name, description, company_id, wip_id, device_id } =
      updateAssetDto;
    const model = await this.findOneAsset(id);

    await stateRunner.manager.update(AssetModel, id, {
      asset_name: asset_name,
      description: description,
      company_id: company_id,
      wip_id: wip_id,
    });
    await stateRunner.cleanup();

    const asset_id = model.id;
    const AssetMappingDevice =
      await this.AssetMappingDeviceModelRepository.find({
        // where: [
        //   { asset_id: asset_id, state: 'active' },
        // ],
        where: { asset_id: asset_id },
        relations: ['Asset', 'Device'],
      });
    for (let i = 0; i < AssetMappingDevice.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      AssetMappingDevice[i].apply(
        AssetMappingDeviceTransition.CO_DELETE,
        stateRunner,
      );
      await AssetMappingDevice[i].saveState();
      await stateRunner.cleanup();
    }

    if (device_id) {
      for (let i = 0; i < device_id.length; i++) {
        const options = {
          asset_id,
          device_id: device_id[i],
        };

        await this.createAssetMappingDevice(options);
      }
    }
  }

  async createConditionType(createConditionTypeDto: CreateConditionTypeDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { condition_type_name, description, field_compare, condition } =
      createConditionTypeDto;
    const model = new ConditionTypeModel();
    model.condition_type_name = condition_type_name;
    model.description = description;
    model.field_compare = field_compare;
    model.condition = condition;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async createAssetMappingDevice(
    createAssetMappingDeviceDto: CreateAssetMappingDeviceDto,
  ) {
    try {
      const { asset_id, device_id } = createAssetMappingDeviceDto;

      const stateRunner = await new StateRunner(this.connection).start();
      const model = new AssetMappingDeviceModel();
      model.device_id = device_id;
      model.asset_id = asset_id;
      await stateRunner.manager.save(model);
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeAssetMappingDevice(id: number) {
    try {
      const model = await this.AssetMappingDeviceModelRepository.findOne(id, {
        relations: ['Asset', 'Device'],
      });

      await this.AssetMappingDeviceModelRepository.remove(model);
    } catch (error) {
      return error.message;
    }
  }

  async findAllAsset() {
    const model = await this.AssetModelRepository.find({
      relations: [
        'Triggers',
        'Company',
        'AssetMappingDevices',
        'AssetMappingDevices.Asset',
        'AssetMappingDevices.Device',
        'AssetMappingDevices.Device.DeviceFields',
      ],
    });

    return model;
  }

  async findAllAssetActive() {
    const model = await this.AssetModelRepository.find({
      where: { state: 'active' },
      relations: [
        'Triggers',
        'Company',
        'AssetMappingDevices',
        'AssetMappingDevices.Asset',
        'AssetMappingDevices.Device',
        'AssetMappingDevices.Device.DeviceFields',
      ],
    });
    return model;
  }

  async findOneAsset(id: number) {
    const model = await this.AssetModelRepository.findOne(id, {
      relations: [
        'Triggers',
        'Company',
        'AssetMappingDevices',
        'AssetMappingDevices.Asset',
        'AssetMappingDevices.Device',
        'AssetMappingDevices.Device.DeviceFields',
      ],
    });
    return model;
  }

  async findOneAssetMappingDevice(id: number) {
    const model = await this.AssetMappingDeviceModelRepository.findOne(id, {
      relations: ['Device', 'Asset'],
    });
    return model;
  }

  async findAllAssetMappingDevice() {
    const model = await this.AssetMappingDeviceModelRepository.find({
      relations: ['Device', 'Asset'],
    });
    return model;
  }

  async updateStateAssetMappingDeviceActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetMappingDeviceModelRepository.findOne(id);

      model.apply(AssetMappingDeviceTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateAssetActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetModelRepository.findOne(id);

      if (model.state === 'start') {
        model.apply(AssetTransition.NEW, stateRunner);
      } else {
        model.apply(AssetTransition.ACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateAssetInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetModelRepository.findOne(id);

      model.apply(AssetTransition.INACTIVE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateAssetRunning(id: number) {}

  async updateStateAssetWarning(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetModelRepository.findOne(id);

      model.apply(AssetTransition.CO_WARNING, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateAssetStop(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetModelRepository.findOne(id);

      model.apply(AssetTransition.STOP, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeAsset(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.AssetModelRepository.findOne(id, {
        relations: ['Triggers', 'Company', 'AssetMappingDevices'],
      });

      model.apply(AssetTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async createTrigger(createTriggerDto: CreateTriggerDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      trigger_name,
      asset_id,
      channel_id,
      value,
      condition_type_id,
      device_field_id,
      type,
    } = createTriggerDto;
    const model = new TriggerModel();
    model.trigger_name = trigger_name;
    model.asset_id = asset_id;
    model.channel_id = channel_id;
    model.value = value;
    model.condition_type_id = condition_type_id;
    model.device_field_id = device_field_id;
    model.type = type;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async updateTrigger(id: number, updateTriggerDto: UpdateTriggerDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      trigger_name,
      asset_id,
      channel_id,
      value,
      condition_type_id,
      device_field_id,
      type,
    } = updateTriggerDto;
    await stateRunner.manager.update(TriggerModel, id, {
      trigger_name,
      asset_id,
      channel_id,
      value,
      condition_type_id,
      device_field_id,
      type,
    });

    await stateRunner.cleanup();
  }

  async findOneTrigger(id: number) {
    const model = await this.TriggerModelRepository.findOne(id, {
      relations: [
        'Asset',
        'Asset.AssetMappingDevices',
        'Asset.AssetMappingDevices.Device',
        'DeviceField',
        'DeviceField.Device',
        'ConditionType',
        'Channel',
        'Messages',
      ],
    });
    return model;
  }

  async findAllTrigger() {
    const model = await this.TriggerModelRepository.find({
      relations: [
        'Asset',
        'DeviceField',
        'ConditionType',
        'Channel',
        'Messages',
      ],
    });
    return model;
  }

  async findAllTriggerActive() {
    const model = await this.TriggerModelRepository.find({
      where: { state: 'active' },
      relations: [
        'Asset',
        'DeviceField',
        'ConditionType',
        'Channel',
        'Messages',
      ],
    });
    return model;
  }

  async updateStateTriggerActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.TriggerModelRepository.findOne(id);

      if (model.state === 'start') {
        model.apply(TriggerTransition.NEW, stateRunner);
      } else {
        model.apply(TriggerTransition.ACTIVE, stateRunner);
      }

      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateTriggerInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.TriggerModelRepository.findOne(id);

      model.apply(TriggerTransition.INACTIVE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeTrigger(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.TriggerModelRepository.findOne(id, {
        relations: [
          'Asset',
          'DeviceField',
          'ConditionType',
          'Channel',
          'Messages',
        ],
      });

      model.apply(TriggerTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }
}
