import { Controller, Get, Param } from '@nestjs/common';
import { StateService } from './states.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  getAll() {
    return this.stateService.getAll();
  }

  @Get(':id')
  getState(@Param('id') id: string) {
    return this.stateService.getState(parseInt(id));
  }
}
