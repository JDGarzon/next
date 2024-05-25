import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findOne(@Param('id') id: string) {
    return this.characterService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.characterService.remove(id);
  }
}
