import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response, Express } from 'express';
import { diskStorage } from 'multer';
import { AppService } from 'src/app.service';
import { MultipleFileDto } from './dto/multiple-file.dto';
import { SingleFileDto } from './dto/single-file.dto';
import { FastifyFileInterceptor } from './interceptor/fastify-file-interceptor';
import { FastifyFilesInterceptor } from './interceptor/fastify-files-interceptor';
import { fileMapper, filesMapper } from './utils/file-mapper';
import { editFileName, imageFileFilter } from './utils/file-upload-util';
import { ImportDataService } from './import-data.service';
import { ProductionPlanningManagementService } from 'src/production-planning-management/production-planning-management.service';
import { ProcessImportDataPlanningDto } from './dto/process-import-data-planning.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('import-data')
@Controller('import-data')
@UseGuards(AuthGuard())
export class ImportDataController {
  constructor(
    readonly importDataService: ImportDataService,
    readonly productionPlanningManagementService: ProductionPlanningManagementService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @Post('single-file/singlePlanData')
  @UseInterceptors(
    FastifyFileInterceptor('file_import', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async singlePlanData(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    await this.importDataService.createImportPlanData(file.filename);
    return { ...body, file_import: fileMapper({ file, req }) };
  }

  @ApiConsumes('multipart/form-data')
  @Post('single-file/singleCusData')
  @UseInterceptors(
    FastifyFileInterceptor('file_import', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async singleCusData(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: SingleFileDto,
  ) {
    await this.importDataService.createImportCusData(file.filename);
    return { ...body, file_import: fileMapper({ file, req }) };
  }

  // @ApiConsumes('multipart/form-data')
  // @Post('multiple-file')
  // @UseInterceptors(
  //   FastifyFilesInterceptor('file_import', 10, {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: editFileName,
  //     }),
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  // async multiple(
  //   @Req() req: Request,
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body() body: MultipleFileDto,
  // ) {
  //   return { ...body, file_import: filesMapper({ files, req }) };
  // }

  @Post('processImportDataCustomer/:id')
  async processImportDataCustomer(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    await this.importDataService.processImportDataCustomer(+id);
    return res.status(HttpStatus.CREATED).send();
  }

  @Post('processImportDataPlanning/:id')
  async processImportDataPlanning(
    @Param('id') id: number,
    @Body() processImportDataPlanningDto: ProcessImportDataPlanningDto,
    @Res() res: Response,
  ) {
    const { ref_wip_flow_id } = processImportDataPlanningDto;
    await this.importDataService.processImportDataPlanning(+id);
    await this.productionPlanningManagementService.processCreateWorkOrder(
      +id,
      ref_wip_flow_id,
    );
    return res.status(HttpStatus.CREATED).send();
  }

  @Delete('removeImport/:id')
  async removeImport(@Param('id') id: number) {
    return await this.importDataService.removeImport(+id);
  }

  @Get('findAllImportPlanning')
  async findAllImportPlanning() {
    return await this.importDataService.findAllImportPlanning();
  }

  @Get('findAllImportCusData')
  async findAllImportCusData() {
    return await this.importDataService.findAllImportCusData();
  }
}
