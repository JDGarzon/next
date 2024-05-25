import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UUID } from "crypto";
import { IsNotEmpty, IsUUID } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsUUID()
    id:UUID;
}
