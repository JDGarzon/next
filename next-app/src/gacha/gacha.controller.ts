import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { CreateGachaDto } from './dto/create-gacha.dto';
import { UpdateGachaDto } from './dto/update-gacha.dto';
import { CharacterController } from 'src/character/character.controller';
import { WeaponController } from 'src/weapon/weapon.controller';

@Controller('gacha')
export class GachaController {
  constructor(private readonly gachaService: GachaService,
    private readonly charactersController:CharacterController,
    private readonly weaponsController:WeaponController
    ) {}

  @Post()
  create(@Body() createGachaDto: CreateGachaDto) {
    return this.gachaService.create(createGachaDto);
  }

  @Get()
  findAll() {
    return this.gachaService.findAll();
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

  getOneCharacter(){

  }

  getTenCharacters(){
  }

  getOneWeapon(){

  }

  getTenWeapon(){
  }


}
