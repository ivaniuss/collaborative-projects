import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
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
=======
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
>>>>>>> dfba103 (Develop (#36))
})
export class UsersModule {}
