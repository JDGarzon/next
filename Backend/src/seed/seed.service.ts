import { Injectable } from '@nestjs/common';
import { CharacterService } from '../character/character.service';
import { WeaponService } from '../weapon/weapon.service';
import {characterSeed} from './data/JSONObjectsCharacters';
import {weaponSeed} from './data/JSONObjectsWeapons';

@Injectable()
export class SeedService {
  constructor(
    private weaponService: WeaponService,
    private characterService: CharacterService
  ) {}

  async seedWeapon(){
    this.weaponService.seedWeapon(weaponSeed);
  }

  async seedCharacter(){
    this.characterService.seedCharacter(characterSeed);
  }
  
}
