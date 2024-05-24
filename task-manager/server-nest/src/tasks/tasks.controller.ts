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
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Body() body) {
    return this.tasksService.getAll(body.data.task.userId);
  }

  @Get(':id')
  getTask(@Param('id') id) {
    return this.tasksService.getOne(parseInt(id));
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.userId,
      createTaskDto.Date,
    );
  }

  @Put(':id')
  updateTask(@Param('id') id, @Body() body) {
    return this.tasksService.update(
      parseInt(id),
      body.data.task.title,
      body.data.task.description,
    );
  }

  @Patch(':id')
  updateState(@Param('id') id, @Body() body) {
    return this.tasksService.updateState(parseInt(id), body.data.task.state);
  }

  @Delete()
  deleteTask(@Param('id') id) {
    return this.tasksService.delete(parseInt(id));
  }
}
