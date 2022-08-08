import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConditionTypeModel,
  TriggerModel,
} from 'src/asset-management/entities';
import { DeviceModel } from 'src/asset-management/entities/device.entity';
import { DeviceFieldModel } from 'src/asset-management/entities/device_field.entity';
import { StateRunner } from 'src/share/lib/state-runner';
import { DeviceTransition } from 'src/state/asset-management/device-state';
import { DeviceFieldTransition } from 'src/state/asset-management/device_field-state';
import { Connection, Repository } from 'typeorm';
import { CreateConditionTypeDto } from './dto/create-conditionType.dto';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateDeviceFieldDto } from './dto/create-deviceField.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { UpdateDeviceFieldDto } from './dto/update-deviceField.dto';
import { UpdateConditionTypeDto } from './dto/update-conditionType.dto';

@Injectable()
export class DeviceManagementService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(DeviceModel)
    private readonly DeviceModelRepository: Repository<DeviceModel>,

    @InjectRepository(DeviceFieldModel)
    private readonly DeviceFieldModelRepository: Repository<DeviceFieldModel>,

    @InjectRepository(TriggerModel)
    private readonly TriggerModelRepository: Repository<TriggerModel>,

    @InjectRepository(ConditionTypeModel)
    private readonly ConditionTypeModelRepository: Repository<ConditionTypeModel>,
  ) {}
  async createDevice(createDeviceDto: CreateDeviceDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { company_id, device_name, description, deviceField } =
      createDeviceDto;
    const model = new DeviceModel();
    model.company_id = company_id;
    model.device_name = device_name;
    model.description = description;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    if (deviceField) {
      const device = await this.DeviceModelRepository.findOne(model.id);
      const device_id = device.id;

      for (let i = 0; i < deviceField.length; i++) {
        const stateRunner = await new StateRunner(this.connection).start();
        const model = new DeviceFieldModel();
        model.device_id = device_id;
        model.field_name = deviceField[i].field_name;
        model.field_type = deviceField[i].field_type;
        model.field_order = deviceField[i].field_order;
        model.description = deviceField[i].field_description;
        await stateRunner.manager.save(model);
        await stateRunner.cleanup();
      }
    }
  }

  async createDeviceField(createDeviceFieldDto: CreateDeviceFieldDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      device_id,
      field_name,
      field_type,
      field_order,
      string_value,
      number_value,
      description,
    } = createDeviceFieldDto;
    const model = new DeviceFieldModel();
    model.device_id = device_id;
    model.field_name = field_name;
    model.field_type = field_type;
    model.field_order = field_order;
    model.string_value = string_value;
    model.number_value = number_value;
    model.description = description;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async findAllDevice() {
    const model = await this.DeviceModelRepository.find({
      relations: [
        'DeviceFields',
        'Company',
        'AssetMappingDevices',
        'AssetMappingDevices.Asset',
        'AssetMappingDevices.Device',
      ],
    });
    return model;
  }

  async findAllDeviceUnMapAsset() {
    // const model = await this.DeviceModelRepository.find({
    //   relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
    // });
    // for (let i = 0; i < model.length; i++) {
    //   console.log(model[i].AssetMappingDevices[i]?.id);
    //   console.log(model[i].AssetMappingDevices[i]?.asset_id);
    //   console.log(model[i].AssetMappingDevices[i]?.device_id);
    // }
    // return model;
  }

  async findAllDeviceField() {
    const model = await this.DeviceFieldModelRepository.find({
      relations: ['Device', 'Triggers'],
    });
    return model;
  }

  async findAllDeviceActive() {
    const model = await this.DeviceModelRepository.find({
      where: { state: 'active' },
      relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
    });
    return model;
  }

  async findOneDevice(id: number) {
    const model = await this.DeviceModelRepository.findOne(id, {
      relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
    });
    return model;
  }

  async findOneDeviceField(id: number) {
    const model = await this.DeviceFieldModelRepository.findOne(id, {
      relations: ['Device', 'Triggers'],
    });
    return model;
  }

  async updateDevice(id: number, updateDeviceDto: UpdateDeviceDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { company_id, device_name, description } = updateDeviceDto;
    const device = await this.findOneDevice(id);

    device.company_id = company_id;
    device.device_name = device_name;
    device.description = description;
    await stateRunner.manager.save(device);
    await stateRunner.cleanup();

    return device;
  }

  async updateFieldDevice(
    id: number,
    updateDeviceFieldDto: UpdateDeviceFieldDto,
  ) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      device_id,
      field_name,
      field_type,
      field_order,
      string_value,
      number_value,
      description,
    } = updateDeviceFieldDto;

    const fieldDevice = await stateRunner.manager.update(DeviceFieldModel, id, {
      device_id,
      field_name,
      field_type,
      field_order,
      string_value,
      number_value,
      description,
    });
    await stateRunner.cleanup();

    return fieldDevice;
  }

  async updateStateDeviceActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.DeviceModelRepository.findOne(id, {
        relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
      });
      if (model.state == 'start') {
        model.apply(DeviceTransition.NEW, stateRunner);
      } else if (model.state == 'inactive') {
        model.apply(DeviceTransition.ACTIVE, stateRunner);
      }

      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateDeviceFieldActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.DeviceFieldModelRepository.findOne(id, {
        relations: ['Device'],
      });

      if (model.state == 'start') {
        model.apply(DeviceFieldTransition.NEW, stateRunner);
      } else if (model.state == 'inactive') {
        model.apply(DeviceFieldTransition.CO_ACTIVE, stateRunner);
      }

      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateDeviceInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.DeviceModelRepository.findOne(id, {
        relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
      });

      model.apply(DeviceTransition.INACTIVE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeDevice(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.DeviceModelRepository.findOne(id, {
        relations: ['DeviceFields', 'Company', 'AssetMappingDevices'],
      });

      model.apply(DeviceTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeDeviceField(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.DeviceFieldModelRepository.findOne(id, {
        relations: ['Device', 'Triggers'],
      });

      model.apply(DeviceFieldTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  // async passingDataDeviceField(id: number, payload: any) {
  //   const stateRunner = await new StateRunner(this.connection).start();
  //   const { type, value } = payload;
  //   const deviceField = await this.findOneDeviceField(id);
  //   if (type == 'string') {
  //     deviceField.string_value = value;
  //   } else if (type == 'number') {
  //     deviceField.number_value = value;
  //   }

  //   await stateRunner.manager.save(deviceField);
  //   await stateRunner.cleanup();

  //   // await this.execute_Condition(id);
  // }

  async passingDataDeviceField(params: any[]) {
    const stateRunner = await new StateRunner(this.connection).start();
    for (let i = 0; i < params.length; i++) {
      const deviceField = await this.findOneDeviceField(params[i].id);
      if (params[i].type == 'string') {
        deviceField.string_value = params[i].value;
      } else if (params[i].type == 'number') {
        deviceField.number_value = params[i].value;
      }
      await stateRunner.manager.save(deviceField);
    }

    await stateRunner.cleanup();
    // await this.execute_Condition(id);
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

  async updateConditionType(
    id: number,
    updateConditionTypeDto: UpdateConditionTypeDto,
  ) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { condition_type_name, description, field_compare, condition } =
      updateConditionTypeDto;

    await stateRunner.manager.update(ConditionTypeModel, id, {
      condition_type_name,
      description,
      field_compare,
      condition,
    });
    await stateRunner.cleanup();
  }

  async findAllConditionType() {
    const model = await this.ConditionTypeModelRepository.find({
      relations: ['Triggers'],
    });
    return model;
  }

  async findOneConditionType(id: number) {
    const model = await this.ConditionTypeModelRepository.findOne(id, {
      relations: ['Triggers'],
    });
    return model;
  }

  async findTriggers(id: number) {
    const trigger = await this.TriggerModelRepository.find({
      where: { condition_type_id: id },
      relations: ['ConditionType'],
    });

    return trigger;
  }

  async removeConditionType(id: number) {
    const stateRunner = await new StateRunner(this.connection).start();
    const trigger = await this.findTriggers(id);
    if (trigger[0]) {
      for (let i = 0; i < trigger.length; i++) {
        await stateRunner.manager.update(TriggerModel, trigger[i].id, {
          condition_type_id: null,
        });
      }
      await stateRunner.cleanup();
      await this.ConditionTypeModelRepository.createQueryBuilder()
        .delete()
        .from(ConditionTypeModel)
        .where('condition_type_id = :id', { id })
        .execute();
    } else {
      await this.ConditionTypeModelRepository.createQueryBuilder()
        .delete()
        .from(ConditionTypeModel)
        .where('condition_type_id = :id', { id })
        .execute();
    }

    return trigger;
  }

  async execute_Condition(id: number) {
    const device_field_id = id;
    const deviceField = await this.findOneDeviceField(id);
    const trigger = await this.TriggerModelRepository.findOne(
      {
        device_field_id,
      },
      {
        relations: ['ConditionType'],
      },
    );

    if (trigger.ConditionType.field_compare == 'number_value') {
      var compare = await eval(
        deviceField.number_value +
          trigger.ConditionType.condition +
          trigger.value,
      );
      console.log(compare);
      if (compare) {
        console.log(
          'Alert ' +
            deviceField.number_value +
            ' ' +
            trigger.ConditionType.condition +
            ' ' +
            trigger.value,
        );
      } else {
        console.log('Nothing');
      }
    }
  }
}
