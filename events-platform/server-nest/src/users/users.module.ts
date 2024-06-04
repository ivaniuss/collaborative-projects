import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProvider, User } from './user.entity';
import { UsersController } from './users.controller';
import { Registration } from 'src/registrations/registration.entity';
import { Event } from 'src/events/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthProvider, Event, Registration]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
