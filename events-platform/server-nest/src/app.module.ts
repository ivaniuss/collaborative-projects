import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
<<<<<<< HEAD
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
=======
import { User } from './users/entities/user.entity';
import { Event } from './events/entities/event.entity';
import { Registration } from './registrations/entities/registration.entity';
>>>>>>> dfba103 (Develop (#36))
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
<<<<<<< HEAD
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
=======
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'nest',
      password: 'nestpass',
      database: 'taskdb',
      entities: [User, Event, Registration],
      synchronize: true,
    }),
>>>>>>> dfba103 (Develop (#36))
    UsersModule,
    EventsModule,
    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
