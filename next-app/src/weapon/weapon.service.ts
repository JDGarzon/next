import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Weapon, WeaponDocument } from './schema/weapon.schema';
import {v4 as uuid} from 'uuid'

@Injectable()
export class WeaponService {
  constructor(@InjectModel(Weapon.name) private weaponModule: Model<WeaponDocument>) {}

  async create(createWeaponDto: CreateWeaponDto): Promise<Weapon> {
    const weapon = await this.weaponModule.create(createWeaponDto);
    return weapon;
  }

  async findAll(): Promise<Weapon[]> {
    return await this.weaponModule.find({});
  }

  async findOne(id: number) {
    return await this.weaponModule.findById(id);
  }

  async update(id: number, updateWeaponDto: UpdateWeaponDto) {
    return await this.weaponModule.findByIdAndUpdate(id,updateWeaponDto);
  }

  async remove(id: number) {
    return await this.weaponModule.findByIdAndDelete(id);
  }
}
