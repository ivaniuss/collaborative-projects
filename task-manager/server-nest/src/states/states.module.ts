import { Module } from '@nestjs/common';
import { StateService } from './states.service';
import { StateController } from './states.controller';

@Module({
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule {}
