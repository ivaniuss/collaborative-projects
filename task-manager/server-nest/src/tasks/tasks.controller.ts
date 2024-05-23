import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Body() body) {
    return this.tasksService.getAll(body.data.task.userId);
  }

  @Get(':id')
  getTask(@Param('id') id) {
    return this.tasksService.getOne(id);
  }

  @Post()
  createTask(@Body() body) {
    return this.tasksService.create(body.data.task);
  }

  @Put(':id')
  updateTask(@Param('id') id, @Body() body) {
    return this.tasksService.update(id, body.data.task);
  }

  @Patch(':id')
  updateState(@Param('id') id, @Body() body) {
    return this.tasksService.updateState(id, body.data.task.state);
  }

  @Delete()
  deleteTask(@Param('id') id) {
    return this.tasksService.delete(id);
  }
}
