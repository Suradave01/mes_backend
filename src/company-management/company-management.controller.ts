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
  UseGuards,
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
import { AuthGuard } from '@nestjs/passport';

@ApiTags('company-management')
@Controller('company-management')
export class CompanyManagementController {
  constructor(
    private readonly companyManagementService: CompanyManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('createCompany')
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyManagementService.createCompany(createCompanyDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllCompany')
  findAllCompany() {
    return this.companyManagementService.findAllCompany();
  }

  @UseGuards(AuthGuard())
  @Get('findAllCompanyActive')
  findAllCompanyActive() {
    return this.companyManagementService.findAllCompanyActive();
  }

  @Get('findOneCompany/:id')
  findOneCompany(@Param('id') id: number) {
    return this.companyManagementService.findOneCompany(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateCompanyActive/:id')
  updateStateCompanyActive(@Param('id') id: number) {
    return this.companyManagementService.updateStateCompanyActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateCompanyInactive/:id')
  updateStateCompanyInactive(@Param('id') id: number) {
    return this.companyManagementService.updateStateCompanyInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateCompany/:id')
  updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyManagementService.updateCompany(+id, updateCompanyDto);
  }

  @UseGuards(AuthGuard())
  @Delete('removeCompany/:id')
  removeCompany(@Param('id') id: number) {
    return this.companyManagementService.removeCompany(+id);
  }

  @UseGuards(AuthGuard())
  @Post('createCustomer')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.companyManagementService.createCustomer(createCustomerDto);
  }

  @UseGuards(AuthGuard())
  @Patch('updateCustomer/:id')
  updateCustomer(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.companyManagementService.updateCustomer(+id, updateCustomerDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllCustomer')
  findAllCustomer() {
    return this.companyManagementService.findAllCustomer();
  }
}
