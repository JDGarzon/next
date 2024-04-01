import { Injectable } from '@nestjs/common';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from 'src/character/schema/character.schema';
import { Weapon, WeaponDocument } from 'src/weapon/schema/weapon.schema';
import { randomInt } from 'crypto';

@Injectable()
export class GachaService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<CharacterDocument>,
    @InjectModel(Weapon.name) private readonly weaponModel: Model<WeaponDocument>,
  ){}

  create(createGachaDto: CreateGachaDto) {
    return 'This action adds a new gacha';
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

  async getOneCharacter(){
    let options = await this.characterModel.find({});
    let prob=randomInt(0, 1000);
    if(prob<=6){
      options=options.filter((char)=>char.rarity==5);
    }else{
      if(prob<=50){
        options=options.filter((char)=>char.rarity==4);
      }else{
        options=await this.weaponModel.find({})
        console.log(options);
        options=options.filter((obj)=>obj.rarity==3);
        console.log(options);
      }
      
    }
    prob=randomInt(0, options.length-1);
      return options[prob];
  }
}
