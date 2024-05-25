import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import Rol from 'src/user/entities/user.rol';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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

    return this.userModel.create(userObject);
  }

  async login(userObjectLogin:LoginAuthDto){
    const { username, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ username })
    if(!findUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException('INVALID_PASSWORD', HttpStatus.FORBIDDEN);

    const payload = {id: findUser._id, username: findUser.username};
    const token = await this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token, 
    };

    return data;
  }
}
