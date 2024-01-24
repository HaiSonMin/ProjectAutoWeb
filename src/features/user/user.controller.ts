import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@/interfaces/models/IUser.interface';
import { IBaseResponse, IGetManyItem, IQuery } from '@/interfaces/common';
import { ResponseCreate } from '@/core';
import { UserDtoCreate, UserDtoUpdate } from './dto/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User Apis')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo người dùng',
  })
  async create(
    @Body() userDtoCreate: UserDtoCreate,
  ): Promise<IBaseResponse<IUser>> {
    return new ResponseCreate({
      message: 'Tạo người dùng thành công',
      metadata: await this.userService.create(userDtoCreate),
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin người dùng',
  })
  async getById(@Param('id') id: string): Promise<IBaseResponse<IUser>> {
    return new ResponseCreate({
      message: 'Lấy thông tin người dùng thành công',
      metadata: await this.userService.getById(id),
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách người dùng',
  })
  async getAll(
    @Query() query: IQuery,
  ): Promise<IBaseResponse<IGetManyItem<IUser>>> {
    return new ResponseCreate({
      message: 'Lấy thành công danh sách người dùng',
      metadata: await this.userService.getAll(query),
    });
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật thông tin người dùng',
  })
  async updateById(
    @Param('id') id: string,
    @Body() userDtoUpdate: UserDtoUpdate,
  ): Promise<IBaseResponse<IUser>> {
    return new ResponseCreate({
      message: 'Tạo người dùng thành công',
      metadata: await this.userService.updateById(id, userDtoUpdate),
    });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa người dùng',
  })
  async deleteById(@Param('id') id: string): Promise<IBaseResponse<IUser>> {
    return new ResponseCreate({
      message: 'Xóa người dùng thành công',
      metadata: await this.userService.deleteById(id),
    });
  }
}
