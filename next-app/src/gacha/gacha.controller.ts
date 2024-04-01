import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';

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
  getOneWeapon(){
    return this.gachaService.getOneWeapon();
  }
  @Get('weapon10')
  getTenWeapons(){
    return this.gachaService.getTenWeapons();
  }

  @Get('character1')
  getOneCharacter(){
    return this.gachaService.getOneCharacter();
  }
  @Get('character10')
  getTenCharacter(){
    return this.gachaService.getTenCharacters();
  }

}
