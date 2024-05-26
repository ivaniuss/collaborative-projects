import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { StateModule } from './states/states.module';

@Module({
  imports: [UsersModule, AuthModule, StateModule, TasksModule],
})
export class AppModule {}
