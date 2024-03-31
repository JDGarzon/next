import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type CharacterDocument = Character & Document;

@Schema()
export class Character{
  
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

export const CharacterSchema = SchemaFactory.createForClass(Character);