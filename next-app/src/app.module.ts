import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { ArtifactModule } from './artifact/artifact.module';
import { WeaponModule } from './weapon/weapon.module';

@Module({
  imports: [UserModule, CharacterModule, ArtifactModule, WeaponModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
