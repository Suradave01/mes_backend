import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StateRunner } from 'src/share/lib/state-runner';
import { ChannelTransition } from 'src/state/alarm-management/channel.state';
import { Connection, Repository } from 'typeorm';
import { CreateChannelDto } from './dto/createChannet.dto';
import { UpdateChannelDto } from './dto/updateChannel.dto';
import { ChannelModel } from './entities';
import line from '@line/bot-sdk';
import { Notify } from 'line-api';
import { LineNotifyDto } from './dto/lineNotify.dto';

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

  async lineNotify(body: LineNotifyDto) {
    const notify = new Notify({
      // token: 'CvCwQkS2q4IY2ytLIqYj75retX0u0oyYPncTfClQtag',//group
      token: 'RjkgpmRqJJaB1wLTbWbvcGxptno0hvqzMMmfHZl5x1D', //person
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
