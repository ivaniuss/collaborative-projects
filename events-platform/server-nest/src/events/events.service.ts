import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async createEvent(
    createEventDto: CreateEventDto,
    userId: string,
  ): Promise<Event> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      organizer: { id: userId },
    });
    await this.eventsRepository.save(event);
    return event;
  }

  async getEvents(
    filterEventsDto: FilterEventsDto,
    page: number,
    limit: number,
  ): Promise<{ data: Event[]; count: number }> {
    const { title, location, date, sort, sortBy } = filterEventsDto;
    const query = this.eventsRepository.createQueryBuilder('event');

    if (title) {
      query.andWhere('event.title LIKE :title', { title: `%${title}%` });
    }
    if (location) {
      query.andWhere('event.location LIKE :location', {
        location: `%${location}%`,
      });
    }
    if (date) {
      query.andWhere('event.date = :date', { date });
    }

    if (sortBy && sort) {
      const validSort = sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      query.orderBy(`event.${sortBy}`, validSort);
    }

    const [data, count] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, count };
  }
  async getEventById(id: string): Promise<Event | null> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }
}
