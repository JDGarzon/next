import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type WeaponDocument = Weapon & Document;

@Schema()
export class Weapon{
  
  @Prop({unique:true})
  name: string;

  @Prop()
  type: string;

  @Prop()
  tier: string;

  @Prop()
  level: string;

  @Prop()
  img: string;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);