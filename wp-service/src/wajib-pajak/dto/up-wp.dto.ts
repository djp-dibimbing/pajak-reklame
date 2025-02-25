import { PartialType } from '@nestjs/mapped-types';
import { CreateWpDto } from './cr-wp.dto';

export class UpdateWpDto extends PartialType(CreateWpDto) {}
