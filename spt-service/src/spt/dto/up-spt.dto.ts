import { PartialType } from '@nestjs/mapped-types';
import { CreateSptDto } from './cr-spt.dto';

export class UpdateSptDto extends PartialType(CreateSptDto) {}
