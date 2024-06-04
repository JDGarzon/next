import {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import Rol from '../entities/user.rol';

export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

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
}

export const UserSchema = SchemaFactory.createForClass(User);