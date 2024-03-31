import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CharacterModule } from './character/character.module';
import { ArtifactModule } from './artifact/artifact.module';
import { WeaponModule } from './weapon/weapon.module';
import { GachaModule } from './gacha/gacha.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.jjgbu2m.mongodb.net/'),
    UserModule, CharacterModule, ArtifactModule, WeaponModule, GachaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
