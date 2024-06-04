import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import Rol from '../entities/user.rol';

export type UserDocument = User & Document;

@Schema()
export class User extends Document{

  @Prop({unique:true})
  email: string;

  @Prop({unique:true})
  username: string;

  @Prop()
  password: string;

  @Prop({ enum: Rol })
  rol: string;

  @Prop({ type: [[]], default: [] })
  almanac: any[][];

  @Prop()
  level: number;

  @Prop()
  level_points: number;
  @Prop()
  wishes: number;


}

export const UserSchema = SchemaFactory.createForClass(User);