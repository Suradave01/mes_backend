import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactManagementService } from './contact-management.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('contact-management')
@Controller('contact-management')
export class ContactManagementController {
  constructor(
    private readonly contactManagementService: ContactManagementService,
  ) {}

  @Post('createContact')
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactManagementService.createContact(createContactDto);
  }

  @Get('findAllContact')
  findAllContact() {
    return this.contactManagementService.findAllContact();
  }

  @Get('findOneContact/:id')
  findOneContact(@Param('id') id: string) {
    return this.contactManagementService.findOneContact(+id);
  }

  @Patch('updateContact/:id')
  updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactManagementService.updateContact(+id, updateContactDto);
  }

  @Patch('updateStateContactActive/:id')
  updateStateContactActive(@Param('id') id: string) {
    return this.contactManagementService.updateStateContactActive(+id);
  }

  @Patch('updateStateContactInactive/:id')
  updateStateContactInactive(@Param('id') id: string) {
    return this.contactManagementService.updateStateContactInactive(+id);
  }

  @Delete('removeContact/:id')
  removeContact(@Param('id') id: string) {
    return this.contactManagementService.removeContact(+id);
  }
}
