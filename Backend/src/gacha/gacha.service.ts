import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from 'src/character/schema/character.schema';
import { Weapon, WeaponDocument } from 'src/weapon/schema/weapon.schema';
import { randomInt } from 'crypto';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { isInstance } from 'class-validator';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/jwt.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GachaService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<CharacterDocument>,
    @InjectModel(Weapon.name) private readonly weaponModel: Model<WeaponDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
    let options:any[] = await this.characterModel.find({});
    let prob=randomInt(0, 1000);
    if(prob<=6){
      options=options.filter((char)=>char.rarity==5);
    }else{
      if(prob<=54){
        options=options.filter((char)=>char.rarity==4);
        let weapons=await this.weaponModel.find({});
        weapons=weapons.filter((obj)=>obj.rarity==4);
        options=[...options, ...weapons];
      }else{
        options=await this.weaponModel.find({})
        console.log(options);
        options=options.filter((obj)=>obj.rarity==3);
      }
    }
    prob=randomInt(0, options.length-1);

    let result:any[]=[]
    result.push(options[prob]);

    return result;
  }

  async getTenCharacters(){
    let result:any[]=[]
    for(let i=0;i<10;i++){
      result.push(await this.getOneCharacter());
    }
    return result;
  }

  async getOneWeapon(){
    let options:any[] = await this.weaponModel.find({});
    let prob=randomInt(0, 1000);
    if(prob<=6){
      options=options.filter((char)=>char.rarity==5);
    }else{
      if(prob<=54){
        options=options.filter((char)=>char.rarity==4);
        let weapons=await this.weaponModel.find({});
        weapons=weapons.filter((obj)=>obj.rarity==4);
        options=[...options, ...weapons];
      }else{
        options=await this.weaponModel.find({})
        console.log(options);
        options=options.filter((obj)=>obj.rarity==3);
        console.log(options);
      }
    }
    prob=randomInt(0, options.length-1);
    let result:any[]=[]
    result.push(options[prob]);
    return result;
  }

  async getTenWeapons(){
    let result:any[]=[]
    for(let i=0;i<10;i++){
      result.push(await this.getOneWeapon());
    }
    return result;
  }

  async addToAlmanac(request:Request, elements: any[]){
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded: any = jwt.verify(token, jwtConstants.secret);
      const user = await this.userModel.findById(decoded.userId);
      const almanac = user.almanac;
      elements.forEach(element => {
        if(element instanceof Weapon ){
          almanac[0].push(element);
        }else if(element instanceof Character){
          almanac[1].push(element);
        }
      });
      return await this.userModel.findByIdAndUpdate(decoded.userId, {'almanac':almanac});
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
