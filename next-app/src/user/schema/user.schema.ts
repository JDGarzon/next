import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { UUID } from 'crypto';

export type UserDocument = User & Document;

@Schema()
export class User{

  @Prop({unique:true,_id:true})
  id:UUID;

  @Prop({unique:true})
  email: string;

  @Prop({unique:true})
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);