import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model';
import { Model } from 'mongoose';
import { IGetManyItem, IQuery } from '@/interfaces/common';
import { hashPassword, selectFields, skipPage } from '@/utils';
import { IUser } from '@/interfaces/models/IUser.interface';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userDtoCreate: UserDtoCreate): Promise<any> {
    const passHash = await hashPassword(userDtoCreate.user_password);

    const dataCreate: UserDtoCreate = {
      ...userDtoCreate,
      user_password: passHash,
    };

    try {
      const newUser = await this.userModel.create(dataCreate);
      return newUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    if (!user) throw new BadRequestException('Người dùng không tồn tại');
    return user;
  }

  async getAll({ fields, page, limit }: IQuery): Promise<IGetManyItem<IUser>> {
    const [items, totalItems] = await Promise.all([
      this.userModel
        .find()
        .select(selectFields(fields))
        .limit(limit)
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),
      this.userModel.countDocuments(),
    ]);
    return { items, totalItems };
  }

  async updateById(id: string, userDtoUpdate: UserDtoUpdate): Promise<any> {
    const userUpdated = await this.userModel
      .findByIdAndUpdate(id, userDtoUpdate, { new: true })
      .lean()
      .exec();

    if (!userDtoUpdate)
      throw new BadRequestException('Người dùng không tồn tại');
    return userUpdated;
  }

  async deleteById(id: string): Promise<any> {
    const userDeleted = await this.userModel
      .findByIdAndDelete(id)
      .lean()
      .exec();

    if (!userDeleted) throw new BadRequestException('Người dùng không tồn tại');
    return userDeleted;
  }
}
