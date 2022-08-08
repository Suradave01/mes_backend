import { Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImportModel } from 'src/company-management/entities/import.entity';
import { Connection, Repository } from 'typeorm';
import { CreateImportDataDto } from './dto/create-import-data.dto';
import { StateRunner } from 'src/share/lib/state-runner';
import { ImportTransition } from 'src/state/company-management/import-state';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { CompanyManagementService } from 'src/company-management/company-management.service';
import { ImportDataModel } from 'src/company-management/entities';
import { ProductionPlanningManagementService } from 'src/production-planning-management/production-planning-management.service';

@Injectable()
export class ImportDataService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(ImportModel)
    private readonly ImportModelRepository: Repository<ImportModel>,

    @InjectRepository(ImportDataModel)
    private readonly ImportDataModelRepository: Repository<ImportDataModel>,

    private readonly companyManagementService: CompanyManagementService,

    private readonly productionPlanningManagementService: ProductionPlanningManagementService,
  ) {}

  async createImportPlanData(file_name: string) {
    const stateRunner = await new StateRunner(this.connection).start();
    const model = new ImportModel();
    model.file_name = file_name;
    model.file_type = 'Planning';

    await stateRunner.manager.save(model);
    model.apply(ImportTransition.IMPORT, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();
  }

  async createImportCusData(file_name: string) {
    const stateRunner = await new StateRunner(this.connection).start();
    const model = new ImportModel();
    model.file_name = file_name;
    model.file_type = 'CustomerData';

    await stateRunner.manager.save(model);
    model.apply(ImportTransition.IMPORT, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();
  }

  async processImportDataCustomer(id: number) {
    const stateRunner = await new StateRunner(this.connection).start();
    const model = await this.ImportModelRepository.findOne(id);
    const dir = './uploads/' + model.file_name;

    const wb = XLSX.readFile(dir, { dateNF: 'dd/mm/yyyy' });
    console.log(wb.SheetNames);

    wb.SheetNames.forEach(async (sheet) => {
      const ws = wb.Sheets[sheet];
      const data: any = XLSX.utils.sheet_to_json(ws, { raw: false });
      const customers = data;
      // const customers = data.map((data: any) => {
      //   return {
      //     cus_id: data.cus_id,
      //     cus_name: data.cus_n,
      //   };
      // });
      if (customers[0] != undefined) {
        let customer: any = [
          ...new Map(
            customers.map((obj: any) => [JSON.stringify(obj), obj]),
          ).values(),
        ];

        for (let i = 0; i < customer.length; i++) {
          if (customer[i].cus_n) {
            const options = {
              customer_no: customer[i].cus_id + '-' + customer[i].desc_id,
              name: customer[i].cus_n,
              raw_data: customer[i],
              import_id: model.id,
            };
            await this.companyManagementService.createCustomer(options);
          } else {
            const options = {
              customer_no: customer[i].cus_id + '-' + customer[i].desc_id,
              name: '',
              raw_data: customer[i],
              import_id: model.id,
            };
            await this.companyManagementService.createCustomer(options);
          }
        }

        // fs.writeFileSync(
        //   `./uploads/converts/customer/${model.file_name}.json`,
        //   JSON.stringify(customer, null, 2),
        // );
      }
    });

    model.apply(ImportTransition.PROCESS, stateRunner);
    await model.saveState();
    model.apply(ImportTransition.CO_COMPLETE_PROCESS, stateRunner);
    await model.saveState();
    await stateRunner.cleanup();

    // wb.SheetNames.forEach((sheet) => {
    //   const ws = wb.Sheets[sheet];
    //   const data: any = XLSX.utils.sheet_to_json(ws, { raw: false });

    //   const productions = data.map((data: any) => {
    //     return {
    //       cus_id: data.cus_id,
    //       mc_no: data.MC,
    //       description: data.รายการ,
    //       ron: data.ลอน,
    //       grade: data.เกรด,
    //       sqm: data.sqm,
    //       in_long: data.ยาว,
    //       in_width: data.กว้าง,
    //       in_height: data.สูง,
    //       page_size: data.หน้ากระดาษ,
    //     };
    //   });
    //   if (productions[0] != undefined) {
    //     let production = [
    //       ...new Map(
    //         productions.map((obj: any) => [JSON.stringify(obj), obj]),
    //       ).values(),
    //     ];

    //     fs.writeFileSync(
    //       `./uploads/converts/production/${model.file_name}.json`,
    //       JSON.stringify(production, null, 2),
    //     );
    //   }
    // });

    // model.apply(ImportTransition.PROCESS, stateRunner);
    // await model.saveState();
    // await stateRunner.cleanup();
  }

  async processImportDataPlanning(id: number) {
    const modelImport = await this.ImportModelRepository.findOne(id);
    const dir = './uploads/' + modelImport.file_name;

    const wb = XLSX.readFile(dir, { dateNF: 'dd/mm/yyyy' });
    for (let i = 0; i < wb.SheetNames.length; i++) {
      let ws = wb.Sheets[wb.SheetNames[i]];
      let data: any = XLSX.utils.sheet_to_json(ws, {
        raw: false,
      });

      const modelImportData = new ImportDataModel();
      modelImportData.import_id = modelImport.id;
      modelImportData.sheet_name = wb.SheetNames[i];
      modelImportData.raw_data = data;

      await this.ImportDataModelRepository.save(modelImportData);
    }

    const stateRunner = await new StateRunner(this.connection).start();
    modelImport.apply(ImportTransition.PROCESS, stateRunner);
    await modelImport.saveState();
    await stateRunner.cleanup();

    //write file json
    // wb.SheetNames.forEach(async (sheet) => {
    //   const ws = wb.Sheets[sheet];
    //   // const ws = wb.Sheets['C01'];
    //   const data: any = XLSX.utils.sheet_to_json(ws, { raw: false });
    //   console.log(data);

    //   fs.writeFileSync(
    //     `./uploads/converts/planning/${sheet}_${model.file_name}.json`,
    //     JSON.stringify(data, null, 2),
    //   );
    // });
  }

  async findAllImportPlanning() {
    const model = await this.ImportModelRepository.find({
      where: { file_type: 'Planning' },
    });

    return model;
  }

  async findAllImportCusData() {
    const model = await this.ImportModelRepository.find({
      where: { file_type: 'CustomerData' },
    });

    return model;
  }

  async removeImport(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ImportModelRepository.findOne(id, {
        relations: [
          'ImportData',
          'Productions',
          'Customers',
          'WorkOrderItems',
          'CreateBy',
        ],
      });

      model.apply(ImportTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }
}
