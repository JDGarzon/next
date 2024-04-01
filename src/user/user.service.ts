import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../auth/jwt.constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user= await this.userModule.create(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModule.find({});
  }

  async findOne(id: string) {
    return await this.userModule.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return  await this.userModule.findByIdAndUpdate(id,updateUserDto);
  }

  async remove(id: string) {
    return await this.userModule.findByIdAndDelete(id);
  }

  async updateSelf(request: Request, updateUserDto: UpdateUserDto){
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded: any = jwt.verify(token, jwtConstants.secret);
      return await this.userModule.findByIdAndUpdate(decoded.userId, updateUserDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async removeSelf(request: Request){
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded: any = jwt.verify(token, jwtConstants.secret);
      return await this.userModule.findByIdAndDelete(decoded.userId);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
