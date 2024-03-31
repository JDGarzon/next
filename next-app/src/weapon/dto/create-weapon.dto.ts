import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import Type from "../entities/type";
import { UUID } from "crypto";

export class CreateWeaponDto {

    @IsNotEmpty()
    @IsUUID()
    id:UUID;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsEnum(Type, {message: 'not valid type'})
    type:Type;

    @IsNotEmpty()
    @IsNumber()
    level:number;

    @IsNotEmpty()
    mainStat:string;

    @IsNotEmpty()
    subStats:string[];

    @IsNotEmpty()
    effect:string;

    @IsNotEmpty()
    @IsNumber()
    rarity:number;

    @IsNotEmpty()
    img: string;
}
