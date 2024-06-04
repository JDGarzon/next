import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WeaponModule } from './weapon/weapon.module';
import { CharacterModule } from './character/character.module';
import { GachaModule } from './gacha/gacha.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.jjgbu2m.mongodb.net/'),
    UserModule, CharacterModule, WeaponModule, GachaModule, AuthModule, SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule, UserModule, CharacterModule, WeaponModule, GachaModule, AuthModule, SeedModule],
})
export class AppModule {}
