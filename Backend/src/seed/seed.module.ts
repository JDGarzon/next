import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { WeaponModule } from '../weapon/weapon.module';
import { CharacterModule } from '../character/character.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [WeaponModule,CharacterModule],
  exports: [SeedService]
})
export class SeedModule {}
