import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard, RolAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorator/rol.decorator';
import { GetUser } from '../decorator/get-user.decorator';

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
    return this.userService.findByUsername(id);
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
  updateSelf(@GetUser('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateSelf(_id, updateUserDto);
  }

  @Delete('self')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles(['ADMIN', 'PLAYER'])
  removeSelf(@GetUser('_id') _id: string) {
    return this.userService.removeSelf(_id);
  }

}
