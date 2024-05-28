import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const prisma = new PrismaClient();
@Injectable()
export class TasksService {
  async getAll(userId: string) {
    return await prisma.task.findMany({ where: { userId: userId } });
  }

  async getOne(userId: string, id: number) {
    return await prisma.task.findUnique({ where: { userId: userId, id: id } });
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> b754d6c (Feature/task (#25))
=======
>>>>>>> 148dee7 (Feature/task (#30))
  async create(userId: string, createTaskDto: CreateTaskDto) {
=======
  async create(createTaskDto: CreateTaskDto) {
>>>>>>> 087026b (Feature/task (#25))
<<<<<<< HEAD
<<<<<<< HEAD
=======
  async create(userId: string, createTaskDto: CreateTaskDto) {
>>>>>>> 23ea12c (Feature/task (#30))
=======
>>>>>>> b754d6c (Feature/task (#25))
=======
=======
  async create(userId: string, createTaskDto: CreateTaskDto) {
>>>>>>> 23ea12c (Feature/task (#30))
>>>>>>> 148dee7 (Feature/task (#30))
    return await prisma.task.create({
      data: {
        ...createTaskDto,
        update: new Date(),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 148dee7 (Feature/task (#30))
        userId: userId,
=======
>>>>>>> 087026b (Feature/task (#25))
=======
        userId: userId,
>>>>>>> 23ea12c (Feature/task (#30))
<<<<<<< HEAD
=======
        userId: userId,
=======
>>>>>>> 087026b (Feature/task (#25))
>>>>>>> b754d6c (Feature/task (#25))
=======
>>>>>>> 148dee7 (Feature/task (#30))
      },
    });
  }

  async update(userId: string, id: number, updateTaskDto: UpdateTaskDto) {
    return await prisma.task.update({
      where: { id: id, userId: userId },
      data: {
        ...updateTaskDto,
        update: new Date(),
      },
    });
  }
  async updateTask(userId: string, id: number, updateTaskDto: UpdateTaskDto) {
    return await prisma.task.update({
      where: { id: id, userId: userId },
      data: {
        ...updateTaskDto,
      },
    });
  }

  async updateState(userId: string, id: number, updateState: UpdateTaskDto) {
    return await prisma.task.update({
      where: { id: id, userId: userId },
      data: {
        ...updateState,
      },
    });
  }

  async delete(userId: string, id: number) {
    await prisma.task.delete({ where: { userId: userId, id: id } });
  }
}
