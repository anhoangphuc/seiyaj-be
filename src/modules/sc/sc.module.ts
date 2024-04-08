import { Module } from '@nestjs/common';
import { SeiService } from './sei.service';
import { ScService } from './sc.service';

@Module({
  providers: [SeiService, ScService],
  exports: [ScService],
})
export class ScModule {}
