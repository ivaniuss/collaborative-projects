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
import { UpdateTaskDto } from './dto/update-task.dto';

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
<<<<<<< HEAD
<<<<<<< HEAD
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, createTaskDto);
=======
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
>>>>>>> 087026b (Feature/task (#25))
=======
  createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(req.user.id, createTaskDto);
>>>>>>> 23ea12c (Feature/task (#30))
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(req.user.id, id, updateTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Request() req,
    @Param('id', ParseIntPipe) id,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(req.user.id, id, updateTaskDto);
  }

  @Patch(':id')
  updateState(
    @Request() req,
    @Param('id', ParseIntPipe) id,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateState(req.user.id, id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Request() req, @Param('id', ParseIntPipe) id) {
    return this.tasksService.delete(req.user.id, id);
  }
}
