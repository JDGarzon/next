import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { Character, CharacterSchema } from './schema/character.schema';
import { Connection, connect, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import { CharacterDTOStub } from '../../test/stubs/CharacterDto.stub';
import { UpdateCharacterDto } from './dto/update-character.dto';

describe('CharacterController', () => {
  let characterController: CharacterController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let characterModel: Model<Character>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    characterModel = mongoConnection.model(Character.name, CharacterSchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        CharacterService,
        { provide: getModelToken(Character.name), useValue: characterModel },
      ],
    }).compile();
    characterController = moduleRef.get<CharacterController>(CharacterController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('create', () => {
    it('should return the saved object', async () => {
      const createdCharacter = await characterController.create(CharacterDTOStub());
      expect(createdCharacter.name).toBe(CharacterDTOStub().name);
    });
  });
  
  describe('findOne', () => {
    it('should return the corresponding saved object', async () => {
      const createdCharacter = await new characterModel(CharacterDTOStub()).save();
      const character = await characterController.findOne(createdCharacter._id.toHexString());

      expect(character.name).toBe(createdCharacter.name);
    });
  });

  describe('findAll', () => {
    it('should return an array of weapon', async () => {
      const character = await characterController.findAll();
      expect(Array.isArray(character)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update the corresponding weapon', async () => {
      const createdCharacter = await new characterModel(CharacterDTOStub()).save();
      const updateCharacterDto: UpdateCharacterDto = {
        ...CharacterDTOStub(),
        name: 'updatedName',
      };
      await characterController.update(createdCharacter._id.toHexString(), updateCharacterDto);
      const updatedCharacter = await characterModel.findById(createdCharacter._id);
      expect(updatedCharacter.name).toBe(updateCharacterDto.name);
    });
  });

  describe('remove', () => {
    it('should remove the corresponding weapon', async () => {
      const createdCharacter = await new characterModel(CharacterDTOStub()).save();
      await characterController.remove(createdCharacter._id.toHexString());
      const character = await characterModel.findById(createdCharacter._id);
      expect(character).toBeNull();
    });
  });
});
