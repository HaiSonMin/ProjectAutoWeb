import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Controller,
} from '@nestjs/common';
import { IBaseResponse, IGetManyItem, IQuery } from '@/interfaces/common';
import { CloneFBService } from './clonefb.service';
import { CloneFBDtoUpdate, CloneFbDtoCreate } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseCreate, ResponseOk } from '@/core';
import { ICloneFB } from '@/interfaces/models/ICloneFB.interface';

@ApiTags('Clone Apis')
@Controller('clone')
export class CloneFBController {
  constructor(private readonly cloneFBService: CloneFBService) {}

  @Post()
  @ApiOperation({
    summary: 'Create clone',
    description: 'Create clone account facebook',
  })
  async create(
    @Body() cloneFbDtoCreate: CloneFbDtoCreate,
  ): Promise<IBaseResponse<ICloneFB>> {
    return new ResponseCreate({
      message: 'Tạo tài khoảng clone facebook thành công',
      metadata: await this.cloneFBService.create(cloneFbDtoCreate),
    });
  }

  @Get()
  async findAll(
    @Query() query: IQuery,
  ): Promise<IBaseResponse<IGetManyItem<ICloneFB>>> {
    return new ResponseOk({
      message: 'Tạo tài khoảng clone facebook thành công',
      metadata: await this.cloneFBService.findAll(query),
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IBaseResponse<ICloneFB>> {
    return new ResponseOk({
      message: 'Lấy dữ liệu thành công',
      metadata: await this.cloneFBService.findById(id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() cloneFBDtoUpdate: CloneFBDtoUpdate,
  ): Promise<IBaseResponse<ICloneFB>> {
    return new ResponseOk({
      message: 'Cập nhật tài khoảng thành công',
      metadata: await this.cloneFBService.updateById(id, cloneFBDtoUpdate),
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<IBaseResponse<ICloneFB>> {
    return new ResponseOk({
      message: 'Xóa tài khoản thành công',
      metadata: await this.cloneFBService.deleteById(id),
    });
  }
}
