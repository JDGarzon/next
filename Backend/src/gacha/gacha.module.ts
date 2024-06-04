import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';
import { Character, CharacterSchema } from '../character/schema/character.schema';
import { Weapon, WeaponSchema } from '../weapon/schema/weapon.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { CharacterModule } from '../character/character.module';
import { WeaponModule } from '../weapon/weapon.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CharacterModule,WeaponModule,UserModule
  ],
  controllers: [GachaController],
  providers: [GachaService],
  exports: [GachaService]
})
export class GachaModule {}
