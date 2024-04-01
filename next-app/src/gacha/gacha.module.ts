import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';
import { CharacterModule } from '../character/character.module';
import { WeaponModule } from '../weapon/weapon.module';
import { CharacterService } from 'src/character/character.service';
import { WeaponService } from 'src/weapon/weapon.service';

@Module({
  imports: [CharacterModule, WeaponModule],
  controllers: [GachaController],
  providers: [GachaService,CharacterService,WeaponService],
  
})
export class GachaModule {}
