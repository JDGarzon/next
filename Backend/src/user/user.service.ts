import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return await this.userModule.findById(id).exec();
  }

  async findByUsername(id: string) {
    const userA=await this.userModule.find({"username":id}).exec();
    let user =userA[0]
    let userToSend={
      "_id":user._id,
      "username":user.username,
      "almanac":user.almanac,
      "rol":user.rol,
      "level":user.level,
      "level_points":user.level_points,
      "wishes":user.wishes,
      "email":user.email
    }
    return userToSend;
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModule.findByIdAndUpdate(id,updateUserDto);
  }

  async remove(id: string) {
    return await this.userModule.findByIdAndDelete(id);
  }

  async updateSelf(_id:string, updateUserDto: UpdateUserDto){
    return await this.userModule.findByIdAndUpdate(_id, updateUserDto);
  }

  async removeSelf(_id:string){
    return await this.userModule.findByIdAndDelete(_id);
  }
}
