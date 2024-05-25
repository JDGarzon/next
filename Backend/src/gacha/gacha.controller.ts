import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { Request } from 'express';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/rol.decorator';


@Controller('gacha')
export class GachaController {
  constructor(
    private gachaService: GachaService,
    ) {}

  @Post()
  create(@Body() createGachaDto: CreateGachaDto) {
    return this.gachaService.create(createGachaDto);
  }

  @Get('weapon1')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getOneWeapon(@Req() request: Request){
    const result = await this.gachaService.getOneWeapon();
    return this.gachaService.addToAlmanac(request, result);
  }
  @Get('weapon10')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getTenWeapons(@Req() request: Request){
    const result = await this.gachaService.getTenWeapons();
    return this.gachaService.addToAlmanac(request, result);

  }

  @Get('character1')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getOneCharacter(@Req() request: Request){
    const result = await this.gachaService.getOneCharacter();
    return this.gachaService.addToAlmanac(request, result);

  }
  @Get('character10')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['PLAYER'])
  async getTenCharacter(@Req() request: Request){
    const result = await this.gachaService.getTenCharacters();
    return this.gachaService.addToAlmanac(request, result);

  }

}
