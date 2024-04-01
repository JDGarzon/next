import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import Rol from "../entities/user.rol";


export class CreateUserDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsEnum(Rol, {message: 'not valid rol'})
    rol: Rol;
}
