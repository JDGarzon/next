import { CreateUserDto } from './create-user.dto';
export class UpdateUserDto extends CreateUserDto {
  almanac: any[][];
  level:number;
  level_points:number;
}
