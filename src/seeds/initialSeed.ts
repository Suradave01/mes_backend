import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {
  GroupModel,
  PartitionModel,
  UserModel,
} from 'src/user-management/entities';
import { CompanyModel } from 'src/company-management/entities';
import {
  WipFlowMappingModel,
  WipFlowModel,
  WipModel,
} from 'src/production-planning-management/entities';
import {
  AssetMappingDeviceModel,
  AssetModel,
  DeviceFieldModel,
  DeviceModel,
} from 'src/asset-management/entities';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(UserModel)().create();
    // await factory(GroupModel)().createMany(5);
    await factory(CompanyModel)().create();

    const field_default = [
      { name: 'work_number', type: 'textbox', value: '', import_key: 'job_no' },
      { name: 'flute', type: 'textbox', value: '', import_key: 'flute' },
      { name: 'page_size', type: 'textbox', value: '', import_key: 'width1' },
      { name: 'cus_name', type: 'textbox', value: '', import_key: 'cus_name' },
      {
        name: 'sum_grade',
        type: 'textbox',
        value: '',
        import_key: 'sum_grade',
      },
      { name: 'cus_id', type: 'textbox', value: '', import_key: 'cus_id' },
      { name: 'desc_id', type: 'textbox', value: '', import_key: 'desc_id' },
      { name: 'next_asset', type: 'textbox', value: '', import_key: 'c_send' },
      { name: 'q_prod', type: 'textbox', value: '', import_key: 'q_prod' },
      { name: 'front', type: 'textbox', value: '', import_key: 'g_n1' },
      { name: 'flute_B', type: 'textbox', value: '', import_key: 'g_n2' },
      { name: 'back_B', type: 'textbox', value: '', import_key: 'g_n3' },
      { name: 'flute_C', type: 'textbox', value: '', import_key: 'g_n4' },
      { name: 'back_C', type: 'textbox', value: '', import_key: 'g_n5' },
      { name: 'flute_E', type: 'textbox', value: '', import_key: 'g_n6' },
      { name: 'back_E', type: 'textbox', value: '', import_key: 'g_n7' },
      { name: 'mc_no', type: 'textbox', value: '', import_key: 'mc_no' },
      {
        name: 'desc_name',
        type: 'textbox',
        value: '',
        import_key: 'desc_name',
      },
      { name: 's_line', type: 'textbox', value: '', import_key: 's_line' },
      { name: 'b_link', type: 'textbox', value: '', import_key: 'b_link' },
      { name: 'chk_form', type: 'textbox', value: '', import_key: 'chk_form' },
      {
        name: 'number_of_meters',
        type: 'textbox',
        value: '',
        import_key: 'meter_m',
      },
      { name: 'length_mm', type: 'textbox', value: '', import_key: 'sheet_l' },
      { name: 'sheet1', type: 'textbox', value: '', import_key: 'sheet1' },
      { name: 'q_pro', type: 'textbox', value: '', import_key: 'q_pro' },
      { name: 'q_pro_out', type: 'textbox', value: '', import_key: '' },
      { name: 'quant', type: 'textbox', value: '', import_key: 'quant' },
      { name: 'date_pro', type: 'textbox', value: '', import_key: 'date_pro' },
      { name: 'l_line', type: 'textbox', value: '', import_key: 'l_line' },
      { name: 'date_od', type: 'textbox', value: '', import_key: 'date_od' },
      { name: 'pressr', type: 'textbox', value: '', import_key: 'pressr' },
      { name: 'hard', type: 'textbox', value: '', import_key: 'hard' },
      { name: 'soft', type: 'textbox', value: '', import_key: 'soft' },
      { name: 'ink_1', type: 'textbox', value: '', import_key: '' },
      { name: 'ink_2', type: 'textbox', value: '', import_key: '' },
      { name: 'ink_3', type: 'textbox', value: '', import_key: '' },
      { name: 'ink_4', type: 'textbox', value: '', import_key: '' },
      { name: 'this_asset', type: 'textbox', value: '', import_key: '' },
      { name: 'typeItem', type: 'textbox', value: '', import_key: '' },
      { name: 'plan_start_time', type: 'textbox', value: '', import_key: '' },
      { name: 'plan_finish_time', type: 'textbox', value: '', import_key: '' },
      {
        name: 'plan_start_time_real',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'plan_finish_time_real',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      { name: 'time', type: 'textbox', value: '', import_key: '' },
      { name: 'finish_good_asset', type: 'textbox', value: '', import_key: '' },
      { name: 'finish_good_emp', type: 'textbox', value: '', import_key: '' },
      { name: 'fail_good_asset', type: 'textbox', value: '', import_key: '' },
      { name: 'fail_good_emp', type: 'textbox', value: '', import_key: '' },
      { name: 'speed', type: 'textbox', value: '', import_key: '' },
      { name: 'setup', type: 'textbox', value: '', import_key: '' },
      { name: 'p', type: 'textbox', value: '', import_key: '' },
      { name: 'q', type: 'textbox', value: '', import_key: '' },
      { name: 'setup_reason', type: 'textbox', value: '', import_key: '' },
      { name: 'setup_time', type: 'textbox', value: '', import_key: '' },
      { name: 'state', type: 'textbox', value: '', import_key: '' },
    ];
    await connection
      .createQueryBuilder()
      .insert()
      .into(WipModel)
      .values([
        {
          name: '??????????????????',
          description: '??????????????????',
          company_id: 1,
          field_default: field_default,
        },
        {
          name: '???????????????????????????',
          description: '???????????????????????????',
          company_id: 1,
          field_default: field_default,
        },
        {
          name: '???????????????',
          description: '???????????????',
          company_id: 1,
          field_default: field_default,
        },
        {
          name: '???????????????????????????',
          description: '???????????????????????????',
          company_id: 1,
          field_default: field_default,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(AssetModel)
      .values([
        {
          asset_name: 'C01',
          description: '??????????????????',
          company_id: 1,
          wip_id: 1,
        },
        {
          asset_name: 'S01',
          description: '???????????????????????????',
          company_id: 1,
          wip_id: 2,
        },
        {
          asset_name: 'S02',
          description: 'SDF02',
          company_id: 1,
          wip_id: 2,
        },
        {
          asset_name: 'D21',
          description: '???????????????',
          company_id: 1,
          wip_id: 3,
        },
        {
          asset_name: 'D27',
          description: '???????????????RD',
          company_id: 1,
          wip_id: 3,
        },
        {
          asset_name: 'P01',
          description: '??????????????? 2 ??????',
          company_id: 1,
          wip_id: 4,
        },
        {
          asset_name: 'P03',
          description: '??????????????? 3 ??????',
          company_id: 1,
          wip_id: 4,
        },
        {
          asset_name: 'P74',
          description: '??????????????? 4 ??????',
          company_id: 1,
          wip_id: 4,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(DeviceModel)
      .values([
        {
          device_name: 'speed_p74',
          description: '?????????????????????????????????????????????',
          company_id: 1,
        },
        {
          device_name: 'product_counter',
          description: '????????????????????????????????????',
          company_id: 1,
        },
        {
          device_name: 'OK/NG/NC',
          description: '??????????????????????????????',
          company_id: 1,
        },
        {
          device_name: 'OK',
          description: '??????????????????',
          company_id: 1,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(DeviceFieldModel)
      .values([
        {
          device_id: 1,
          field_name: 'speed',
          field_type: 'number',
          field_order: 1,
        },
        {
          device_id: 2,
          field_name: 'amount_product',
          field_type: 'number',
          field_order: 1,
        },
        {
          device_id: 3,
          field_name: 'OK/NG/NC',
          field_type: 'number',
          field_order: 1,
        },
        {
          device_id: 4,
          field_name: 'OK',
          field_type: 'number',
          field_order: 1,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(AssetMappingDeviceModel)
      .values([
        {
          asset_id: 8,
          device_id: 1,
          device_order: 1,
        },
        {
          asset_id: 8,
          device_id: 2,
          device_order: 2,
        },
        {
          asset_id: 8,
          device_id: 3,
          device_order: 3,
        },
        {
          asset_id: 8,
          device_id: 4,
          device_order: 4,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WipFlowModel)
      .values([
        {
          wip_flow_name: 'Flow Main',
          company_id: 1,
          description: "don't delete",
          is_template: true,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(WipFlowMappingModel)
      .values([
        {
          wip_flow_id: 1,
          wip_id: 1,
          wip_sequence: 0,
        },
        {
          wip_flow_id: 1,
          wip_id: 2,
          wip_sequence: 1,
        },
        {
          wip_flow_id: 1,
          wip_id: 3,
          wip_sequence: 2,
        },
        {
          wip_flow_id: 1,
          wip_id: 4,
          wip_sequence: 3,
        },
      ])
      .execute();
  }
}
