import {Document, Types} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Weapon } from '../../weapon/schema/weapon.schema';
import Element from '../entities/Element';

export type CharacterDocument = Character & Document;

@Schema()
export class Character{
  
  @Prop({unique:true})
  id:UUID;

  @Prop({unique:true})
  name:string;

  @Prop({ enum: Element })
  element:string;

  @Prop({ type: Types.ObjectId, ref: 'Weapon' })
  weapon: Types.ObjectId;

  @Prop()
  rarity:number;

  @Prop()
  constellation:number;  

  @Prop()
  stats:string[];

  @Prop()
  level:number;

  @Prop()
  img: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);