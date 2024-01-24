import { EStatus } from '@/enums';
import { ApiProperty } from '@nestjs/swagger';

export abstract class IQuery {
  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 100,
    title: 'Limit',
    format: 'int32',
    default: 10,
    description: 'Used for define number of items per page',
    required: true,
  })
  limit: number;

  @ApiProperty({
    default: 1,
    type: Number,
    title: 'Page',
    description: 'Used for skip page',
    required: true,
  })
  page: number;

  @ApiProperty({
    type: String,
    title: 'Sort',
    description: 'Used for sort values',
    required: false,
  })
  sort: string;

  @ApiProperty({
    type: String,
    title: 'Key Search',
    description: 'Used for search by key word',
    required: false,
  })
  keySearch: string;

  @ApiProperty({
    type: String,
    title: 'Filter',
    description: 'Used for filter value is enum for column',
    required: false,
  })
  filters: string;

  @ApiProperty({
    type: String,
    title: 'Filter',
    description: 'Used for filter operations type',
    required: false,
  })
  numericFilters: string;

  @ApiProperty({
    type: String,
    title: 'Select fields',
    description: 'Used for selecting fields to display',
    required: false,
  })
  fields: string;

  @ApiProperty({
    type: String,
    enum: EStatus,
    title: 'Status',
    description: 'Filter by status',
    required: false,
  })
  status: string;
}
