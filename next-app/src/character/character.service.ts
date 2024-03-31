import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { UUID } from 'crypto';

@Injectable()
export class CharacterService {
  create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  findAll() {
    return `This action returns all character`;
  }

  findOne(id: string) {
    return `This action returns a #${id} character`;
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
