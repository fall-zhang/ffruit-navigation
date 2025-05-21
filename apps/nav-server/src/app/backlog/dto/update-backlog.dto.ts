import { PartialType } from '@nestjs/mapped-types';
import { CreateBacklogDto } from './create-backlog.dto';

export class UpdateBacklogDto extends PartialType(CreateBacklogDto) {}
