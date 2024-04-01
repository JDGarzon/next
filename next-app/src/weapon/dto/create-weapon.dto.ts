import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import Type from "../entities/type";

export class CreateWeaponDto {

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsEnum(Type, {message: 'not valid type'})
    type:Type;

    @IsNotEmpty()
    @IsNumber()
    level:number;

    @IsNotEmpty()
    subStats:string;

    @IsNotEmpty()
    effect:string;

    @IsNotEmpty()
    @IsNumber()
    rarity:number;

    @IsNotEmpty()
    img: string;
}
