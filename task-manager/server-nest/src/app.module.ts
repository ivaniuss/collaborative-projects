import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StateController } from './state/state.controller';
import { StateService } from './state/state.service';
import { StateModule } from './state/state.module';

@Module({
  imports: [UsersModule, AuthModule, StateModule],
  controllers: [StateController],
  providers: [StateService],
})
export class AppModule {}
