import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';
import { CharacterModule } from '../character/character.module';
import { WeaponModule } from '../weapon/weapon.module';

@Module({
  imports: [CharacterModule, WeaponModule],
  controllers: [GachaController],
  providers: [GachaService],
  
})
export class GachaModule {}
