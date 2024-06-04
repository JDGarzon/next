import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SeedService } from './seed.service';
import { JwtAuthGuard, RolAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorator/rol.decorator';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  
  
  @Post('character')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  async seedCharacter(){
    this.seedService.seedCharacter();
  }

  @Post('weapon')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  async seedWeapon(){
    this.seedService.seedWeapon();
  }
}
