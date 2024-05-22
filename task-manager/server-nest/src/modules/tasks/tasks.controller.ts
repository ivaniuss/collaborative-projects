import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): object {
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTask(@Param('id') id): object {
    return this.tasksService.getOne(id);
  }

  @Post()
  createTask(@Body() body): object {
    return this.tasksService.create(body.task);
  }

  @Put(':id')
  updateTask(@Param('id') id, @Body() body): object {
    return this.tasksService.update(id, body.task);
  }

  @Delete()
  deleteTask(@Param('id') id): void {
    return this.tasksService.delete(id);
  }
}
