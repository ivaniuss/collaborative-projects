<<<<<<< HEAD
import { Controller, Post, Get, Param, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
>>>>>>> dfba103 (Develop (#36))

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

<<<<<<< HEAD
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
=======
  @Post()
  create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsService.create(createRegistrationDto);
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistrationDto: UpdateRegistrationDto) {
    return this.registrationsService.update(+id, updateRegistrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationsService.remove(+id);
>>>>>>> dfba103 (Develop (#36))
  }
}
