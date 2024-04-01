import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';
import { Character, CharacterSchema } from 'src/character/schema/character.schema';
import { Weapon, WeaponSchema } from 'src/weapon/schema/weapon.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Character.name, schema: CharacterSchema}, {name: Weapon.name, schema: WeaponSchema}]),
  ],
  controllers: [GachaController],
  providers: [GachaService],
  
})
export class GachaModule {}
