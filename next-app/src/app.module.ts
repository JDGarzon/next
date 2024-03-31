import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { ArtifactModule } from './artifact/artifact.module';
import { WeaponModule } from './weapon/weapon.module';
import { GachaModule } from './gacha/gacha.module';

@Module({
  imports: [UserModule, CharacterModule, ArtifactModule, WeaponModule, GachaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
