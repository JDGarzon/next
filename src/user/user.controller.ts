import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/rol.decorator';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN'])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put('self')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  updateSelf(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateSelf(request, updateUserDto);
  }

  @Delete('self')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  removeSelf(@Req() request: Request) {
    return this.userService.removeSelf(request);
  }

}
