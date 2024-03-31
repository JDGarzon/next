import { IsNotEmpty, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class CreateUserDto {

    @IsNotEmpty()
    @IsUUID()
    id:UUID;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
