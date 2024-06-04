import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { User } from 'src/users/user.entity';
import { Registration } from 'src/registrations/registration.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Registration]), AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [TypeOrmModule],
})
export class EventsModule {}
