import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { UUID } from "crypto";
import Element from '../entities/Element';

export class CreateCharacterDto {
    
    @IsNotEmpty()
    @IsUUID()
    id:UUID;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsEnum(Element, {message: 'not valid element'})
    element:Element;

    @IsNotEmpty()
    weapon: string;

    @IsNotEmpty()
    @IsNumber()
    rarity:number;

    @IsNotEmpty()
    @IsNumber()
    constellation:number;  

    @IsNotEmpty()
    stats:string[];

    @IsNotEmpty()
    @IsNumber()
    level:number;

    @IsNotEmpty()
    img: string;
}
