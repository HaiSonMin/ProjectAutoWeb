import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CloneFB } from './model';
import { Mail } from '../scripts/mail/model';
import { InjectModel } from '@nestjs/mongoose';
import { selectFields, skipPage } from '@/utils';
import { CloneFBDtoUpdate, CloneFbDtoCreate } from './dto';
import { IGetManyItem, IQuery } from '@/interfaces/common';
import { ICloneFB } from '@/interfaces/models/ICloneFB.interface';

@Injectable()
export class CloneFBService {
  constructor(
    @InjectModel(CloneFB.name) private cloneFBModel: Model<CloneFB>,
    @InjectModel(Mail.name) private mailModel: Model<Mail>,
  ) {}

  async create(cloneFBDtoCreate: CloneFbDtoCreate): Promise<ICloneFB> {
    // Check mail have exist
    const mail = await this.mailModel
      .findById(cloneFBDtoCreate.clonefb_mail)
      .lean()
      .exec();

    if (!mail) {
      throw new NotFoundException('Email không tồn tại!!!');
    }

    const newCloneFb = await this.cloneFBModel.create(cloneFBDtoCreate);
    return newCloneFb;
  }

  async findAll({
    limit,
    page,
    fields,
  }: IQuery): Promise<IGetManyItem<ICloneFB>> {
    const [totalItems, items] = await Promise.all([
      this.cloneFBModel.countDocuments(),
      this.cloneFBModel
        .find()
        .select(selectFields(fields))
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .populate([{ path: 'clonefb_mail', select: ['mail_address'] }])
        .lean()
        .exec(),
    ]);

    return {
      totalItems,
      items,
    };
  }

  async findById(id: string): Promise<ICloneFB> {
    const account = await this.cloneFBModel.findById(id);
    if (!account) throw new BadRequestException('Tài khoảng không tồn tại');
    return account;
  }

  async updateById(
    id: string,
    cloneFbDtoUpdate: CloneFBDtoUpdate,
  ): Promise<ICloneFB> {
    const accountUpdated = await this.cloneFBModel.findByIdAndUpdate(
      id,
      cloneFbDtoUpdate,
    );

    if (!accountUpdated) {
      throw new BadRequestException('Không tìm thấy tài khoản');
    }

    return accountUpdated;
  }

  async deleteById(id: string): Promise<ICloneFB> {
    const accountDeleted = await this.cloneFBModel.findByIdAndDelete(id);

    if (!accountDeleted) {
      throw new BadRequestException('Xóa tài khoản thất bại');
    }

    return accountDeleted;
  }
}
