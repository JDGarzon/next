import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import Type from '../entities/type';
import { UUID } from 'crypto';

export type WeaponDocument = Weapon & Document;

@Schema()
export class Weapon{

  @Prop({unique:true,_id:true})
  id:UUID;

  @Prop({unique:true})
  name:string;

  @Prop({ enum: Type })
  type:string;

  @Prop()
  level:number;

  @Prop()
  subStats:string;

  @Prop()
  effect:string;

  @Prop()
  rarity:number;

  @Prop()
  img: string;
}

export const WeaponSchema = SchemaFactory.createForClass(Weapon);