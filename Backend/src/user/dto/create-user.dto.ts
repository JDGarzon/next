import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import Rol from "../entities/user.rol";


export class CreateUserDto {



    email: string;


    username: string;

    password: string;

    @IsNotEmpty()
    @IsEnum(Rol, {message: 'not valid rol'})
    rol: Rol;

    @IsOptional()
    almanac: any[][];
    @IsOptional()
    level:number;
    @IsOptional()
    level_points:number;

    wishes: number;
}
