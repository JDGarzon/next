import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { UUID } from 'crypto';
import Rol from '../entities/user.rol';

export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop({unique:true})
  email: string;

  @Prop({unique:true})
  username: string;

  @Prop()
  password: string;

  @Prop({ enum: Rol })
  rol: string;
}

export const UserSchema = SchemaFactory.createForClass(User);