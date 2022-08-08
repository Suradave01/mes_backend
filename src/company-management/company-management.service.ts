import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { CompanyTransition } from 'src/state/company-management/company-state';
import { CustomerTransition } from 'src/state/company-management/customer-state';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm/connection/Connection';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CompanyModel } from './entities/company.entity';
import { CustomerModel } from './entities/customer.entity';

@Injectable()
export class CompanyManagementService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(CompanyModel)
    private readonly CompanyModelRepository: Repository<CompanyModel>,

    @InjectRepository(CustomerModel)
    private readonly CustomerModelRepository: Repository<CustomerModel>,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { name, fullName, address, telephone_no } = createCompanyDto;
    const model = new CompanyModel();
    model.name = name;
    model.fullname = fullName;
    model.address = address;
    model.telephone_no = telephone_no;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { name, fullName, address, telephone_no } = updateCompanyDto;
    await stateRunner.manager.update(CompanyModel, id, {
      name: name,
      fullname: fullName,
      address: address,
      telephone_no: telephone_no,
    });
    await stateRunner.cleanup();
  }

  async findAllCompany() {
    const model = await this.CompanyModelRepository.find({
      relations: ['Customers', 'UserMappingCompanies', 'Assets'],
    });
    return model;
  }

  async findAllCompanyActive() {
    const model = await this.CompanyModelRepository.find({
      where: { state: 'active' },
      relations: ['Customers', 'UserMappingCompanies', 'Assets'],
    });
    return model;
  }

  async findOneCompany(id: number) {
    const model = await this.CompanyModelRepository.findOne(id, {
      relations: ['Customers', 'UserMappingCompanies', 'Assets'],
    });
    return model;
  }

  async updateStateCompanyActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.CompanyModelRepository.findOne(id);

      if (model.state == 'start') {
        model.apply(CompanyTransition.NEW, stateRunner);
      } else {
        model.apply(CompanyTransition.ACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateCompanyInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.CompanyModelRepository.findOne(id);

      model.apply(CompanyTransition.INACTIVE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeCompany(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.CompanyModelRepository.findOne(id, {
        relations: ['Customers', 'UserMappingCompanies', 'Assets'],
      });

      model.apply(CompanyTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { name, company_id, import_id, customer_no, raw_data } =
      createCustomerDto;
    const model = new CustomerModel();
    model.name = name;
    model.customer_no = customer_no;
    model.company_id = company_id;
    model.raw_data = raw_data;
    if (import_id) {
      model.import_id = import_id;
      await stateRunner.manager.save(model);
      model.apply(CustomerTransition.CO_IMPORT, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } else {
      await stateRunner.manager.save(model);
      model.apply(CustomerTransition.NEW, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    }
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { name, company_id, customer_no } = updateCustomerDto;
    await stateRunner.manager.update(CustomerModel, id, {
      name: name,
      customer_no: customer_no,
      company_id: company_id,
    });
    await stateRunner.cleanup();
  }

  async findAllCustomer() {
    const model = await this.CustomerModelRepository.find({
      relations: ['Company'],
    });
    return model;
  }

  async findOneCustomerWhere(mc_no: number) {
    const model = await this.CustomerModelRepository.findOne({
      where: { customer_no: mc_no },
      relations: ['Company'],
    });
    return model;
  }

  async findAllCustomerActive() {
    const model = await this.CustomerModelRepository.find({
      where: { state: 'active' },
      relations: ['Company'],
    });
    return model;
  }

  async findOneCustomer(id: number) {
    const model = await this.CustomerModelRepository.findOne(id, {
      relations: ['Company'],
    });
    return model;
  }
}
