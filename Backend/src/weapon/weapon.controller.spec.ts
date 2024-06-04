import { Test, TestingModule } from '@nestjs/testing';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { Weapon, WeaponSchema } from './schema/weapon.schema';
import { Connection, connect, Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken } from '@nestjs/mongoose';
import { WeaponDTOStub } from '../../test/stubs/WeaponDto.stub';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

describe('WeaponController', () => {
  let weaponController: WeaponController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let weaponModel: Model<Weapon>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    weaponModel = mongoConnection.model(Weapon.name, WeaponSchema,);
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [
        WeaponService,
        { provide: getModelToken(Weapon.name), useValue: weaponModel },
      ],
    }).compile();
    weaponController = moduleRef.get<WeaponController>(WeaponController);
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
      const createdWeapon = await weaponController.create(WeaponDTOStub());
      expect(createdWeapon.name).toBe(WeaponDTOStub().name);
    });
  });

  describe('findOne', () => {
    it('should return the corresponding saved object', async () => {
      const createdWeapon = await weaponController.create(WeaponDTOStub());
      const weapon = await weaponController.getByName(createdWeapon.name); 
      expect(weapon[0].name).toBe(createdWeapon.name);
      
    });
  });

  describe('findAll', () => {
    it('should return an array of weapon', async () => {
      const weapon = await weaponController.findAll();
      expect(Array.isArray(weapon)).toBeTruthy();
    });
  });

  
  describe('update', () => {
    it('should update the corresponding weapon', async () => {
      const createdWeapon = await new weaponModel(WeaponDTOStub()).save();
      const updateWeaponDto: UpdateWeaponDto = {
        ...WeaponDTOStub(),
        name: 'updatedName',
      };
      await weaponController.update(createdWeapon._id.toHexString(), updateWeaponDto);
      const updatedWeapon = await weaponModel.findById(createdWeapon._id);
      expect(updatedWeapon.name).toBe(updateWeaponDto.name);
    });
  });

  describe('remove', () => {
    it('should remove the corresponding weapon', async () => {
      const createdWeapon = await new weaponModel(WeaponDTOStub()).save();
      await weaponController.remove(createdWeapon._id.toHexString());
      const weapon = await weaponModel.findById(createdWeapon._id);
      expect(weapon).toBeNull();
    });
  });

});
