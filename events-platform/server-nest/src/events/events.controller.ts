import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventsDto } from './dto/filter-events.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @Roles(Role.Admin, Role.Organizer)
  async createEvent(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.eventsService.createEvent(createEventDto, req.user.id);
  }

  @Roles(Role.User)
  @Get()
  async getEvents(
    @Query() filterEventsDto: FilterEventsDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.eventsService.getEvents(filterEventsDto, page, limit);
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }
}
