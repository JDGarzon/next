import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type ArtifactDocument = Artifact & Document;

@Schema()
export class Artifact{
  
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

export const ArtifactSchema = SchemaFactory.createForClass(Artifact);