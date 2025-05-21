import { Injectable } from '@nestjs/common';
import { CreateNavDto } from './dto/create-nav.dto';
import { UpdateNavDto } from './dto/update-nav.dto';

@Injectable()
export class NavService {
  create(createNavDto: CreateNavDto) {
    return 'This action adds a new nav';
  }

  findAll() {
    return `This action returns all nav`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nav`;
  }

  update(id: number, updateNavDto: UpdateNavDto) {
    return `This action updates a #${id} nav`;
  }

  remove(id: number) {
    return `This action removes a #${id} nav`;
  }
}
