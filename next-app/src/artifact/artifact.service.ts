import { Injectable } from '@nestjs/common';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Artifact, ArtifactDocument } from './schema/artifact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ArtifactService {
  constructor(@InjectModel(Artifact.name) private artifactModule: Model<ArtifactDocument>) {}

  async create(createArtifactDto: CreateArtifactDto): Promise<Artifact> {
    const createdArtifact = await this.artifactModule.create(createArtifactDto);
    return createdArtifact;
  }

  async findAll(): Promise<Artifact[]> {
    return await this.artifactModule.find({});
  }

  findOne(id: string) {
    return `This action returns a #${id} artifact`;
  }

  update(id: string, updateArtifactDto: UpdateArtifactDto) {
    return `This action updates a #${id} artifact`;
  }

  remove(id: string) {
    return `This action removes a #${id} artifact`;
  }
}
