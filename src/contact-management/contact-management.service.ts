import { ContactTransition } from './../state/contact-management/contact-state';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { Connection, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactModel } from './entities';

@Injectable()
export class ContactManagementService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(ContactModel)
    private readonly ContactModelRepository: Repository<ContactModel>,
  ) {}

  async createContact(createContactDto: CreateContactDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      contact_name,
      contact_lastName,
      create_by,
      company_id,
      address,
      telephone_no,
      line_token,
    } = createContactDto;
    const model = new ContactModel();
    model.contact_name = contact_name;
    model.contact_lastname = contact_lastName;
    model.createdBy = create_by;
    model.company_id = company_id;
    model.address = address;
    model.telephone_no = telephone_no;
    model.line_token = line_token;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async findAllContact() {
    const model = await this.ContactModelRepository.find({
      relations: ['Company', 'ContactMappingChannels', 'Messages', 'CreateBy'],
    });
    return model;
  }

  async findOneContact(id: number) {
    const model = await this.ContactModelRepository.findOne(id, {
      relations: ['Company', 'ContactMappingChannels', 'Messages', 'CreateBy'],
    });
    return model;
  }

  async updateContact(id: number, updateContactDto: UpdateContactDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const {
      contact_name,
      contact_lastName,
      create_by,
      company_id,
      address,
      telephone_no,
      line_token,
    } = updateContactDto;
    const model = await this.findOneContact(id);

    model.contact_name = contact_name;
    model.contact_lastname = contact_lastName;
    model.createdBy = create_by;
    model.company_id = company_id;
    model.address = address;
    model.telephone_no = telephone_no;
    model.line_token = line_token;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();

    return model;
  }

  async updateStateContactActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ContactModelRepository.findOne(id);

      if (model.state == 'start') {
        model.apply(ContactTransition.NEW, stateRunner);
      } else if (model.state == 'inactive') {
        model.apply(ContactTransition.ACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateContactInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ContactModelRepository.findOne(id);

      if (model.state == 'active') {
        model.apply(ContactTransition.INACTIVE, stateRunner);
      }

      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeContact(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.findOneContact(id);

      model.apply(ContactTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }
}
