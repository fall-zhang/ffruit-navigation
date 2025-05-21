import { PartialType } from '@nestjs/mapped-types';
import { CreateNavDto } from './create-nav.dto';

export class UpdateNavDto extends PartialType(CreateNavDto) {}
