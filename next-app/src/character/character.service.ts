import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { UUID } from 'crypto';
import { Character, CharacterDocument } from './schema/character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModule: Model<CharacterDocument>) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = await this.characterModule.create(createCharacterDto);
    return createdCharacter;
  }

  async findAll(): Promise<Character[]> {
    return await this.characterModule.find({});
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
