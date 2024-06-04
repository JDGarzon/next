import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect } from 'mongoose';
import { AppModule } from './app.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';

import { CharacterDTOStub } from '../test/stubs/CharacterDto.stub';

describe('AppController', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(uri)
      ],
      providers: [
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  describe(`/auth `, () => {
    it('should return an array of characters', async () => {
      const res=await request(app.getHttpServer()).post('/auth/register').send({username: "test",
      password:"1234",
      email: "test"});
      expect(res.status).toBe(201);
      const res2=await request(app.getHttpServer()).post('/auth/login').send({username: "admin", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      const res3=await request(app.getHttpServer()).delete('/user/'+res.body._id).set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(200);
    });
  });

  describe(`/character `, () => {

    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      let character= CharacterDTOStub();
      let res3=await request(app.getHttpServer()).post('/character').send(character).set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(401);
      res2=await request(app.getHttpServer()).post('/auth/login').send({username: "admin", password:"1234"});
      expect(res2.status).toBe(201);
      token=res2.body.token;
      character= CharacterDTOStub();
      res3=await request(app.getHttpServer()).post('/character').send(character).set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(201);
      const res=await request(app.getHttpServer()).delete('/character/'+res3.body._id).set('Authorization', 'Bearer '+token);
      expect(res.status).toBe(200);
  });
  
  })

  describe(`/weapon `, () => {

    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      let character= CharacterDTOStub();
      let res3=await request(app.getHttpServer()).post('/weapon').send(character).set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(401);
      res2=await request(app.getHttpServer()).post('/auth/login').send({username: "admin", password:"1234"});
      expect(res2.status).toBe(201);
      token=res2.body.token;
      character= CharacterDTOStub();
      res3=await request(app.getHttpServer()).post('/weapon').send(character).set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(201);
      const res=await request(app.getHttpServer()).delete('/weapon/'+res3.body._id).set('Authorization', 'Bearer '+token);
      expect(res.status).toBe(200);
      });
  });

  describe(`/gacha `, () => {
    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      const res3=await request(app.getHttpServer()).get('/gacha/character1').set('Authorization', 'Bearer '+token);
      expect(res3.status).toBe(200);
      expect(res3.body.length).toBe(1);
    });

    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      const res4=await request(app.getHttpServer()).get('/gacha/character10').set('Authorization', 'Bearer '+token);
      expect(res4.status).toBe(200);
      expect(res4.body.length).toBe(10);
    });

    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      const res5=await request(app.getHttpServer()).get('/gacha/weapon1').set('Authorization', 'Bearer '+token);
      expect(res5.status).toBe(200);
      expect(res5.body.length).toBe(1);
    });

    it('should return an array of characters', async () => {
      let res2=await request(app.getHttpServer()).post('/auth/login').send({username: "player2", password:"1234"});
      expect(res2.status).toBe(201);
      let token=res2.body.token;
      const res6=await request(app.getHttpServer()).get('/gacha/weapon10').set('Authorization', 'Bearer '+token);
      expect(res6.status).toBe(200);
      expect(res6.body.length).toBe(10);
    });
  });
});
