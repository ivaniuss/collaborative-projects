import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Request,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Request() req) {
    return this.tasksService.getAll(req.user.id);
  }

  @Get(':id')
  getTask(@Request() req, @Param('id', ParseIntPipe) id) {
    return this.tasksService.getOne(req.user.id, id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.userId,
      createTaskDto.update,
      createTaskDto.stateId,
    );
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.update(req.user.id, id, createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Request() req,
    @Param('id', ParseIntPipe) id,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.updateTask(
      req.user.id,
      id,
      createTaskDto.title,
      createTaskDto.description,
    );
  }

  @Patch(':id')
  updateState(
    @Param('id', ParseIntPipe) id,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.updateState(id, createTaskDto.stateId);
  }

  @Delete()
  deleteTask(@Param('id', ParseIntPipe) id) {
    return this.tasksService.delete(id);
  }
}
