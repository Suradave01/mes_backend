import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { ChannelTransition } from 'src/state/alarm-management/channel.state';
import { Connection, Repository } from 'typeorm';
import { CreateChannelDto } from './dto/createChannel.dto';
import { UpdateChannelDto } from './dto/updateChannel.dto';
import { ChannelModel } from './entities';
import line from '@line/bot-sdk';
import { Notify } from 'line-api';
import { LineNotifyDto } from './dto/lineNotify.dto';
import { CreateContactMappingChannelDto } from './dto/createContactMappingChannel.dto';
import { ContactMappingChannelModel } from 'src/contact-management/entities';
import { ContactMappingChannelTransition } from 'src/state/contact-management/contact_mapping_channel-state';

@Injectable()
export class AlarmManagementService {
  constructor(
    private readonly connection: Connection,

    @InjectRepository(ChannelModel)
    private readonly ChannelModelRepository: Repository<ChannelModel>,
  ) {}
  async createChannel(createChannelDto: CreateChannelDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { channel_name, description, create_by, type, template_id } =
      createChannelDto;

    const model = new ChannelModel();
    model.channel_name = channel_name;
    model.description = description;
    model.createdBy = create_by;
    model.type = type;
    model.template_id = template_id;

    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async findAllChannel() {
    const model = await this.ChannelModelRepository.find({
      relations: [
        'Template',
        'CreateBy',
        'Messages',
        'Triggers',
        'ChannelMappingWips',
        'ChannelMappingWipFlows',
        'ContactMappingChannels',
      ],
    });
    return model;
  }

  async findAllChannelActive() {
    const model = await this.ChannelModelRepository.find({
      where: { state: 'active' },
      relations: [
        'Template',
        'CreateBy',
        'Messages',
        'Triggers',
        'ChannelMappingWips',
        'ChannelMappingWipFlows',
        'ContactMappingChannels',
      ],
    });
    return model;
  }

  async findOneChannel(id: number) {
    const model = await this.ChannelModelRepository.findOne(id, {
      relations: [
        'Template',
        'CreateBy',
        'Messages',
        'Triggers',
        'ChannelMappingWips',
        'ChannelMappingWipFlows',
        'ContactMappingChannels',
      ],
    });
    return model;
  }

  async updateChannel(id: number, updateChannelDto: UpdateChannelDto) {
    const stateRunner = await new StateRunner(this.connection).start();
    const { channel_name, description, create_by, type, template_id } =
      updateChannelDto;
    const model = await this.findOneChannel(id);
    model.channel_name = channel_name;
    model.description = description;
    model.createdBy = create_by;
    model.type = type;
    model.template_id = template_id;
    await stateRunner.manager.save(model);
    await stateRunner.cleanup();
  }

  async updateStateChannelActive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ChannelModelRepository.findOne(id);

      if (model.state == 'start') {
        model.apply(ChannelTransition.NEW, stateRunner);
      } else if (model.state == 'inactive') {
        model.apply(ChannelTransition.ACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async updateStateChannelInactive(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.ChannelModelRepository.findOne(id);

      if (model.state == 'active') {
        model.apply(ChannelTransition.INACTIVE, stateRunner);
      }
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  async removeChannel(id: number) {
    try {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = await this.findOneChannel(id);

      model.apply(ChannelTransition.DELETE, stateRunner);
      await model.saveState();
      await stateRunner.cleanup();
    } catch (error) {
      return error.message;
    }
  }

  // async sendMessageLine() {
  //   const client = new line.Client({
  //     channelAccessToken:
  //       '2yri6ErzHoOAkqu3qfCRJCEkPmqkpUSDlXY6oRNnaTsE7SKNsyVHbyWsUT0NOC2YeCTKZ+LzWxnnZzA7fyBrWkq8pltqXXD3TZm3Jhnn0NKRf5tsxO/EBJlDpys2agF1PvUaCewZwgqrKiN7SZw0hQdB04t89/1O/w1cDnyilFU=',
  //     channelSecret: 'abca07754d4a7174f7c98d78c9d227f7',
  //   });

  //   const message: any = {
  //     type: 'text',
  //     text: 'Hello World!',
  //   };

  //   client.pushMessage('<to>', message);
  // }

  async createContactMappingChannel(
    createContactMappingChannelDto: CreateContactMappingChannelDto,
  ) {
    const { contact_id, value, channel_id, _primary } =
      createContactMappingChannelDto;

    for (let i = 0; i < contact_id.length; i++) {
      const stateRunner = await new StateRunner(this.connection).start();
      const model = new ContactMappingChannelModel();

      model.contact_id = contact_id[i];
      model.value = value;
      model.channel_id = channel_id;
      model._primary = _primary;
      await stateRunner.manager.save(model);
      if (model.state === 'start') {
        model.apply(ContactMappingChannelTransition.NEW, stateRunner);
        await model.saveState();
      }
      await stateRunner.cleanup();
    }
  }

  async lineNotify(body: LineNotifyDto) {
    const array = [
      'RjkgpmRqJJaB1wLTbWbvcGxptno0hvqzMMmfHZl5x1D',
      'CvCwQkS2q4IY2ytLIqYj75retX0u0oyYPncTfClQtag',
    ];
    for (let i = 0; i < array.length; i++) {
      const token = array[i];
      const notify = new Notify({
        // token: 'CvCwQkS2q4IY2ytLIqYj75retX0u0oyYPncTfClQtag',//group
        // token: 'RjkgpmRqJJaB1wLTbWbvcGxptno0hvqzMMmfHZl5x1D', //person
        token: token,
      });

      const imageFile =
        'https://images.freeimages.com/images/large-previews/389/mitze-1380778.jpg';

      notify
        .send({
          message: body.message,
          // sticker: { packageId: 1, id: 2 }, // exact ids
          // image: { fullsize: imageFile, thumbnail: imageFile }, // remote url
        })
        .then(console.log);
      // { status: 200, message: 'ok' }

      notify.status().then(console.log);
    }
  }
}
