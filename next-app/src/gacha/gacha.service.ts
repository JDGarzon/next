import { Injectable } from '@nestjs/common';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';

@Injectable()
export class GachaService {
  create(createGachaDto: CreateGachaDto) {
    return 'This action adds a new gacha';
  }

  findAll() {
    return `This action returns all gacha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gacha`;
  }

  update(id: number, updateGachaDto: UpdateGachaDto) {
    return `This action updates a #${id} gacha`;
  }

  remove(id: number) {
    return `This action removes a #${id} gacha`;
  }
}
