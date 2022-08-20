import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ContactManagementService } from './contact-management.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contact-management')
@Controller('contact-management')
@UseGuards(AuthGuard())
export class ContactManagementController {
  constructor(
    private readonly contactManagementService: ContactManagementService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('createContact')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactManagementService.createContact(createContactDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllContact')
  findAllContact() {
    return this.contactManagementService.findAllContact();
  }

  @Get('findOneContact/:id')
  findOneContact(@Param('id') id: string) {
    return this.contactManagementService.findOneContact(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateContact/:id')
  updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactManagementService.updateContact(+id, updateContactDto);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateContactActive/:id')
  updateStateContactActive(@Param('id') id: string) {
    return this.contactManagementService.updateStateContactActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateContactInactive/:id')
  updateStateContactInactive(@Param('id') id: string) {
    return this.contactManagementService.updateStateContactInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeContact/:id')
  removeContact(@Param('id') id: string) {
    return this.contactManagementService.removeContact(+id);
  }
}
