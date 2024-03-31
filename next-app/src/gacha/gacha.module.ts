import { Module } from '@nestjs/common';
import { GachaService } from './gacha.service';
import { GachaController } from './gacha.controller';

@Module({
  controllers: [GachaController],
  providers: [GachaService],
})
export class GachaModule {}
