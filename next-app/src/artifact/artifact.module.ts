import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { Artifact, ArtifactSchema } from './schema/artifact.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artifact.name, schema: ArtifactSchema }])],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
