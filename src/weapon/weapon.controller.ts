import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  create(@Body() createWeaponDto: CreateWeaponDto) {
    return this.weaponService.create(createWeaponDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findAll() {
    return this.weaponService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findOne(@Param('id') id: string) {
    return this.weaponService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateWeaponDto: UpdateWeaponDto) {
    return this.weaponService.update(+id, updateWeaponDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.weaponService.remove(+id);
  }
}
