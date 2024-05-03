import { PartialType } from '@nestjs/mapped-types';
import { CreateFacebookDto } from './create-facebook.dto';

export class UpdateFacebookDto extends PartialType(CreateFacebookDto) {}
