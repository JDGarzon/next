import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character, CharacterDocument } from './schema/character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModule: Model<CharacterDocument>) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const character = await this.characterModule.create(createCharacterDto);
    return character;
  }

  async findAll(): Promise<Character[]> {
    return await this.characterModule.find({});
  }

  async findOne(id: string) {
    return await this.characterModule.findById(id);
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    await this.characterModule.findByIdAndUpdate(id,updateCharacterDto);
    return await this.characterModule.findById(id);
  }

  async remove(id: string) {
    return await this.characterModule.findByIdAndDelete(id);
  }

  async seedCharacter(createCharacter: Character[]){
    await this.characterModule.insertMany(createCharacter);
  }

  async getByName(nameT: string){
    return await this.characterModule.find({name: nameT});
  }
}
