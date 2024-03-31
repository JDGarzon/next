import { IsNotEmpty } from "class-validator";

export class CreateCharacterDto {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    tier: string;

    @IsNotEmpty()
    level: string;

    @IsNotEmpty()
    img: string;
}
