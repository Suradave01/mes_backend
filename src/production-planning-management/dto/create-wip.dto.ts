import { ApiProperty } from '@nestjs/swagger';
import { WIP_DEFAULT } from './wip_field_default';

export class CreateWipDto {
  @ApiProperty({ type: 'string' })
  name?: string;
  @ApiProperty({ type: 'string' })
  description?: string;
  @ApiProperty({ type: 'number' })
  company_id?: number;
  // @ApiProperty({ type: 'number' })
  // max_wip?: number;
  @ApiProperty({
    type: 'string',
    default: [
      {
        name: 'work_number',
        type: 'textbox',
        value: '',
        import_key: 'job_no',
      },
      {
        name: 'flute',
        type: 'textbox',
        value: '',
        import_key: 'flute',
      },
      {
        name: 'page_size',
        type: 'textbox',
        value: '',
        import_key: 'width1',
      },
      {
        name: 'cus_name',
        type: 'textbox',
        value: '',
        import_key: 'cus_name',
      },
      {
        name: 'sum_grade',
        type: 'textbox',
        value: '',
        import_key: 'sum_grade',
      },
      {
        name: 'cus_id',
        type: 'textbox',
        value: '',
        import_key: 'cus_id',
      },
      {
        name: 'desc_id',
        type: 'textbox',
        value: '',
        import_key: 'desc_id',
      },
      {
        name: 'next_asset',
        type: 'textbox',
        value: '',
        import_key: 'c_send',
      },
      {
        name: 'q_prod',
        type: 'textbox',
        value: '',
        import_key: 'q_prod',
      },
      {
        name: 'front',
        type: 'textbox',
        value: '',
        import_key: 'g_n1',
      },
      {
        name: 'flute_B',
        type: 'textbox',
        value: '',
        import_key: 'g_n2',
      },
      {
        name: 'back_B',
        type: 'textbox',
        value: '',
        import_key: 'g_n3',
      },
      {
        name: 'flute_C',
        type: 'textbox',
        value: '',
        import_key: 'g_n4',
      },
      {
        name: 'back_C',
        type: 'textbox',
        value: '',
        import_key: 'g_n5',
      },
      {
        name: 'flute_E',
        type: 'textbox',
        value: '',
        import_key: 'g_n6',
      },
      {
        name: 'back_E',
        type: 'textbox',
        value: '',
        import_key: 'g_n7',
      },
      {
        name: 'mc_no',
        type: 'textbox',
        value: '',
        import_key: 'mc_no',
      },
      // {
      //   name: 'bk_w',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'bk_w',
      // },
      // {
      //   name: 'bk_l',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'bk_l',
      // },
      {
        name: 'desc_name',
        type: 'textbox',
        value: '',
        import_key: 'desc_name',
      },
      {
        name: 's_line',
        type: 'textbox',
        value: '',
        import_key: 's_line',
      },
      // {
      //   name: 'slit_l',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'slit_l',
      // },
      // {
      //   name: 'slit_w',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'slit_w',
      // },
      // {
      //   name: 'die_id',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'die_id',
      // },
      // {
      //   name: 'die_up',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'die_up',
      // },
      {
        name: 'b_link',
        type: 'textbox',
        value: '',
        import_key: 'b_link',
      },
      {
        name: 'chk_form',
        type: 'textbox',
        value: '',
        import_key: 'chk_form',
      },
      // {
      //   name: 'supply_front_paper',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id1',
      // },
      // {
      //   name: 'supply_paper_flute_B',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id2',
      // },
      // {
      //   name: 'supply_back_paper_flute_B',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id3',
      // },
      // {
      //   name: 'supply_paper_flute_C',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id4',
      // },
      // {
      //   name: 'supply_back_paper_flute_C',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id5',
      // },
      // {
      //   name: 'supply_paper_flute_E',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id6',
      // },
      // {
      //   name: 'supply_back_paper_flute_E',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'ven_id7',
      // },
      // {
      //   name: 'weight_front_paper',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_1',
      // },
      // {
      //   name: 'weight_paper_flute_B',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_2',
      // },
      // {
      //   name: 'supply_back_paper_flute_B',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_3',
      // },
      // {
      //   name: 'weight_paper_flute_C',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_4',
      // },
      // {
      //   name: 'supply_back_paper_flute_C',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_5',
      // },
      // {
      //   name: 'weight_paper_flute_E',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_6',
      // },
      // {
      //   name: 'supply_back_paper_flute_E',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'we_7',
      // },
      {
        name: 'number_of_meters',
        type: 'textbox',
        value: '',
        import_key: 'meter_m',
      },
      {
        name: 'length_mm',
        type: 'textbox',
        value: '',
        import_key: 'sheet_l',
      },
      {
        name: 'sheet1',
        type: 'textbox',
        value: '',
        import_key: 'sheet1',
      },
      {
        name: 'q_pro',
        type: 'textbox',
        value: '',
        import_key: 'q_pro',
      },
      {
        name: 'q_pro_out',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      // {
      //   name: 'remark_s',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'remark_s',
      // },
      // {
      //   name: 'remark_p',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'remark_p',
      // },
      // {
      //   name: 'remark_f',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'remark_f',
      // },
      {
        name: 'quant',
        type: 'textbox',
        value: '',
        import_key: 'quant',
      },
      {
        name: 'date_pro',
        type: 'textbox',
        value: '',
        import_key: 'date_pro',
      },
      // {
      //   name: 'q_bind',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'q_bind',
      // },
      // {
      //   name: 'q_stit',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'q_stit',
      // },
      {
        name: 'l_line',
        type: 'textbox',
        value: '',
        import_key: 'l_line',
      },
      {
        name: 'date_od',
        type: 'textbox',
        value: '',
        import_key: 'date_od',
      },
      // {
      //   name: 'd_link',
      //   type: 'textbox',
      //   value: '',
      //   import_key: 'd_link',
      // },
      {
        name: 'pressr',
        type: 'textbox',
        value: '',
        import_key: 'pressr',
      },
      {
        name: 'hard',
        type: 'textbox',
        value: '',
        import_key: 'hard',
      },
      {
        name: 'soft',
        type: 'textbox',
        value: '',
        import_key: 'soft',
      },
      {
        name: 'ink_1',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'ink_2',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'ink_3',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'ink_4',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'this_asset',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'typeItem',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'plan_start_time',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'plan_finish_time',
        type: 'textbox',
        value: '',
        import_key: '',
      },
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
      {
        name: 'time',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'finish_good_asset',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'finish_good_emp',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'fail_good_asset',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'fail_good_emp',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'speed',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'setup',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'p',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'q',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'setup_reason',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'setup_time',
        type: 'textbox',
        value: '',
        import_key: '',
      },
      {
        name: 'state',
        type: 'textbox',
        value: '',
        import_key: '',
      },
    ],
  })
  fieldDefault?: any;
  // @ApiProperty({ type: 'string' })
  // calculate_function?: string;
  // @ApiProperty({ type: 'string' })
  // presentation_template?: string;
}
