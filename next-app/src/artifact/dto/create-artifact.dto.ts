import { IsNotEmpty } from "class-validator";

export class CreateArtifactDto {

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
