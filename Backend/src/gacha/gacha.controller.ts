import { Controller, Get, UseGuards } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { JwtAuthGuard, RolAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorator/rol.decorator';
import { GetUser } from '../decorator/get-user.decorator';


@Controller('gacha')
export class GachaController {
  constructor(
    private gachaService: GachaService,
    ) {}

  @Get('weapon1')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getOneWeapon(@GetUser('_id') _id: string){
    return await this.gachaService.getOneWeapon(_id);
  }
  @Get('weapon10')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getTenWeapons(@GetUser('_id') _id: string){
    return await this.gachaService.getTenWeapons(_id);

  }

  @Get('character1')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getOneCharacter(@GetUser('_id') _id: string){
    return await this.gachaService.getOneCharacter(_id);
  }

  @Get('character10')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getTenCharacter(@GetUser('_id') _id: string){
    return await this.gachaService.getTenCharacters(_id);

  }

}
