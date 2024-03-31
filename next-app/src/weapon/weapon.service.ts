import { Injectable } from '@nestjs/common';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weapon, WeaponDocument } from './schema/weapon.schema';

@Injectable()
export class WeaponService {
  constructor(@InjectModel(Weapon.name) private weaponModule: Model<WeaponDocument>) {}

  async create(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    const createdWeapon = await this.weaponModule.create(createWeaponDto);
    return createdWeapon;
  }

  async findAll(): Promise<Weapon[]> {
    return await this.weaponModule.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} weapon`;
  }

  update(id: number, updateWeaponDto: UpdateWeaponDto) {
    return `This action updates a #${id} weapon`;
  }

  remove(id: number) {
    return `This action removes a #${id} weapon`;
  }
}
