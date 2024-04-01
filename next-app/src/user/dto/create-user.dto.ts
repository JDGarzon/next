import { IsNotEmpty, IsUUID } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
