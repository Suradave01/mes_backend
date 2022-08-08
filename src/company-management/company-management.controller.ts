import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyManagementService } from './company-management.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import { diskStorage } from 'multer';
import { extname } from 'path';
import path = require('path');
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('company-management')
@Controller('company-management')
export class CompanyManagementController {
  constructor(
    private readonly companyManagementService: CompanyManagementService,
  ) {}

  @Post('createCompany')
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyManagementService.createCompany(createCompanyDto);
  }

  @Get('findAllCompany')
  findAllCompany() {
    return this.companyManagementService.findAllCompany();
  }

  @Get('findAllCompanyActive')
  findAllCompanyActive() {
    return this.companyManagementService.findAllCompanyActive();
  }

  @Get('findOneCompany/:id')
  findOneCompany(@Param('id') id: number) {
    return this.companyManagementService.findOneCompany(+id);
  }

  @Patch('updateStateCompanyActive/:id')
  updateStateCompanyActive(@Param('id') id: number) {
    return this.companyManagementService.updateStateCompanyActive(+id);
  }

  @Patch('updateStateCompanyInactive/:id')
  updateStateCompanyInactive(@Param('id') id: number) {
    return this.companyManagementService.updateStateCompanyInactive(+id);
  }

  @Patch('updateCompany/:id')
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyManagementService.updateCompany(+id, updateCompanyDto);
  }

  @Delete('removeCompany/:id')
  removeCompany(@Param('id') id: number) {
    return this.companyManagementService.removeCompany(+id);
  }

  @Post('createCustomer')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.companyManagementService.createCustomer(createCustomerDto);
  }

  @Patch('updateCustomer/:id')
  updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.companyManagementService.updateCustomer(+id, updateCustomerDto);
  }

  @Get('findAllCustomer')
  findAllCustomer() {
    return this.companyManagementService.findAllCustomer();
  }
}
