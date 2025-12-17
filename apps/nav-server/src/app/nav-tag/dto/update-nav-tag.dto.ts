import { PartialType } from '@nestjs/mapped-types'
import { CreateNavTagDto } from './create-nav-tag.dto'

export class UpdateNavTagDto extends PartialType(CreateNavTagDto) {}
