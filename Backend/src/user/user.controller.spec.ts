import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schema/user.schema';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UserDTOStub } from "../../test/stubs/userDto.stub";
import { UpdateUserDto } from './dto/update-user.dto';


describe('UserController', () => {
  let userController: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {provide: getModelToken(User.name), useValue: userModel},
      ],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
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

  describe("create", () => {
    it("should return the saved object", async () => {
      const createdUser = await userController.create(UserDTOStub());
      expect(createdUser.username).toBe(UserDTOStub().username);
    });
  });

  describe("findOne", () => {
    it("should return the corresponding saved object", async () => {

      const createdUser = await userController.create(UserDTOStub());
      const user = await userController.findOne(createdUser._id);
      expect(user.username).toBe(createdUser.username);
    });
    
  });
  
  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await userController.findAll();
      expect(Array.isArray(users)).toBeTruthy();
    });
  });
  
  describe('update', () => {
    it('should update the corresponding user', async () => {
      const createdUser = await userController.create(UserDTOStub());
      const updateUserDto: UpdateUserDto = { ...UserDTOStub(), username: 'updatedUsername' };
      await userController.update(createdUser._id, updateUserDto);
      const updatedUser = await userModel.findById(createdUser._id);
      expect(updatedUser.username).toBe(updateUserDto.username);
    });
  });
  
  describe('remove', () => {
    it('should remove the corresponding user', async () => {
      const createdUser = await userController.create(UserDTOStub());
      await userController.remove(createdUser._id);
      const user = await userModel.findById(createdUser._id);
      expect(user).toBeNull();
    });
  });

  describe('updateSelf', () => {
    it('should update the current user', async () => {
      const createdUser = await userController.create(UserDTOStub());
      const updateUserDto: UpdateUserDto = { ...UserDTOStub(), username: 'updatedUsername' };
      await userController.updateSelf(createdUser._id, updateUserDto);
      const updatedUser = await userModel.findById(createdUser._id);
      expect(updatedUser.username).toBe(updateUserDto.username);
    });
  });
  
  describe('removeSelf', () => {
    it('should remove the current user', async () => {
      const createdUser = await userController.create(UserDTOStub());
      await userController.removeSelf(createdUser._id);
      const user = await userModel.findById(createdUser._id);
      expect(user).toBeNull();
    });
  });

});

