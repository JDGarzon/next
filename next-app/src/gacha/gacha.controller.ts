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

  @Get('character')
  getOneCharacter(){
    return this.gachaService.getOneCharacter();
  }

  getTenCharacters(){
    
  }

  getOneWeapon(){

  }

  getTenWeapon(){
  }


}
