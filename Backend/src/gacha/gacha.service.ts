import { Injectable } from '@nestjs/common';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { Character } from '../character/schema/character.schema';
import { Weapon } from '../weapon/schema/weapon.schema';
import { randomInt } from 'crypto';
import { CharacterService } from '../character/character.service';
import { WeaponService } from '../weapon/weapon.service';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import Rol from '../user/entities/user.rol';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class GachaService {
  constructor(
    private readonly characterService: CharacterService,
    private readonly weaponService: WeaponService,
    private readonly userService: UserService,
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

  async getOneCharacter(id : string){
    const user = await this.userService.findOne(id);
    const wishes=user.wishes
    if(wishes<10){
      throw new HttpException("Faltan deseos", 404)
    }
    let options:any[] = await this.characterService.findAll();
    let prob=randomInt(0, 1000);
    if(prob<=6){
      options=options.filter((char)=>char.rarity==5);
    }else{
      if(prob<=54){
        options=options.filter((char)=>char.rarity==4);
        let weapons=await this.weaponService.findAll();
        weapons=weapons.filter((obj)=>obj.rarity==4);
        options=[...options, ...weapons];
      }else{
        options=await this.weaponService.findAll();
        options=options.filter((obj)=>obj.rarity==3);
      }
    }
    prob=randomInt(0, options.length-1);

    let result:any[]=[]
    result.push(options[prob]);
    this.addToAlmanac(id, result);
    return result;
  }

  async getTenCharacters(id : string){
    let result:any[]=[]
    const user = await this.userService.findOne(id);
    const wishes=user.wishes
    if(wishes<10){
      throw new HttpException("Faltan deseos", 404)
    }
    for(let i=0;i<10;i++){
      result.push(await this.getOneCharacter(id));
    }
    return result;
  }

  async getOneWeapon(id : string){
    const user = await this.userService.findOne(id);
    const wishes=user.wishes
    if(wishes<1){
      throw new HttpException("Faltan deseos", 404)
    }
    let options:any[] = await this.weaponService.findAll();
    let prob=randomInt(0, 1000);
    if(prob<=6){
      options=options.filter((char)=>char.rarity==5);
    }else{
      if(prob<=54){
        options=options.filter((char)=>char.rarity==4);
        let weapons=await this.weaponService.findAll();
        weapons=weapons.filter((obj)=>obj.rarity==4);
        options=[...options, ...weapons];
      }else{
        options=await this.weaponService.findAll();
        options=options.filter((obj)=>obj.rarity==3);
      }
    }
    prob=randomInt(0, options.length-1);
    let result:any[]=[]
    result.push(options[prob]);
    this.addToAlmanac(id, result);
    return result;
  }

  async getTenWeapons(id : string){
    let result:any[]=[]
    const user = await this.userService.findOne(id);
    const wishes=user.wishes
    if(wishes<10){
      throw new HttpException("Faltan deseos", 404)
    }
    for(let i=0;i<10;i++){
      result.push(await this.getOneWeapon(id));
    }
    return result;
  }

  async addToAlmanac(id:string, elements: any[]){
    const user = await this.userService.findOne(id);
    let almanac = user.almanac;
    elements.forEach(element => {
      if (element.subStats) {
        almanac[0].push(element);
      } else if (element.constellation==0) {
        almanac[1].push(element);
      }
    });
    const updateUser = new UpdateUserDto();
    updateUser.almanac = almanac;
    updateUser.email = user.email;
    updateUser.password = user.password;
    updateUser.rol = user.rol as Rol;
    updateUser.username = user.username;
    updateUser.level_points=user.level_points+100;
    updateUser.level=user.level;
    if(updateUser.level_points==1000){
      updateUser.level_points=0,
      updateUser.level
    }
    
    return await this.userService.update(id, updateUser);
  }
}
