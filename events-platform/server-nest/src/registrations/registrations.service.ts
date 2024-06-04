import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationsRepository: Repository<Registration>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async registerUserToEvent(
    userId: string,
    eventId: string,
  ): Promise<Registration> {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID "${eventId}" not found`);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const registration = this.registrationsRepository.create({
      user,
      event,
    });

    return this.registrationsRepository.save(registration);
  }

  async getRegistrationsByUser(userId: string): Promise<Registration[]> {
    return this.registrationsRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
    });
  }

  async getRegistrationsByEvent(eventId: string): Promise<Registration[]> {
    return this.registrationsRepository.find({
      where: { event: { id: eventId } },
      relations: ['user'],
    });
  }
}
