import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { randomInt } from 'crypto';
import { CharacterService } from 'src/character/character.service';

@Controller('gacha')
export class GachaController {
  constructor(
    private readonly gachaService: GachaService,
    private readonly characterService: CharacterService
    ) {}

  @Post()
  create(@Body() createGachaDto: CreateGachaDto) {
    return this.gachaService.create(createGachaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gachaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGachaDto: UpdateGachaDto) {
    return this.gachaService.update(+id, updateGachaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gachaService.remove(+id);
  }

  @Get()
  async getOneCharacter(){
    let character = [{rarity:2}];
    let prob=randomInt(0, 100);
    if(prob<=3){
      character=character.filter((char)=>char.rarity==5);
    }else{
      character=character.filter((char)=>char.rarity==4);
    }
    prob=randomInt(0, character.length-1);
      return character[prob];
  }

  getTenCharacters(){
    
  }

  getOneWeapon(){

  }

  getTenWeapon(){
  }


}
