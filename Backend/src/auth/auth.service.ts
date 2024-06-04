import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import Rol from '../user/entities/user.rol';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
    ) {}

  async register(userDto: RegisterAuthDto){
    const { password } = userDto;
    const plainToHash = await hash(password, 10);
    const userObject = new CreateUserDto();
    userObject.email = userDto.email;
    userObject.username = userDto.username;
    userObject.password = plainToHash;
    userObject.rol = Rol.PLAYER;
    userObject.level = 1;
    userObject.level_points = 0;
    userObject.wishes = 0;
    userObject.almanac = [[], []];

    return this.userModel.create(userObject);
  }

  async login(userObjectLogin:LoginAuthDto){
    const { username, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ username })
    if(!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('INVALID_PASSWORD', HttpStatus.FORBIDDEN);

    const payload = {id: findUser._id, username: findUser.username,rol: findUser.rol};
    
    const token = await this.jwtService.sign(payload);
    const data = {
      username: findUser.username,
      token, 
    };

    return data;
  }

  private decodeToken(token: string){
    console.log(token)
    return this.jwtService.decode(token);
  }
}
