import { Controller, Post, Get, Param, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post(':eventId')
  async registerUserToEvent(@Param('eventId') eventId: string, @Request() req) {
    return this.registrationsService.registerUserToEvent(req.user.id, eventId);
  }

  @Get('user/:userId')
  async getRegistrationsByUser(@Param('userId') userId: string) {
    return this.registrationsService.getRegistrationsByUser(userId);
  }

  @Get('event/:eventId')
  async getRegistrationsByEvent(@Param('eventId') eventId: string) {
    return this.registrationsService.getRegistrationsByEvent(eventId);
  }
}
