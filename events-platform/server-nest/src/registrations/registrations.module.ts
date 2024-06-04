import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './registration.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registration, Event, User])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
