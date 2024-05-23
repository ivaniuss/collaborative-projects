import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Task } from 'src/tasks/dto/create-task.dto';

const prisma = PrismaClient();
@Injectable()
export class TasksService {
  async getAll(userId: string) {
    return await prisma.task.findMany({ where: { userId } });
  }

  async getOne(id: number) {
    return await prisma.findunique({ where: { id } });
  }

  async create(task: Task) {
    return await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        userId: task.userId,
        state: task.state,
        date: task.Date,
      },
    });
  }

  async update(id: string, task: Task) {
    return await prisma.task.update({
      where: { id },
      data: {
        title: task.title,
        description: task.description,
        userId: task.userId,
        date: task.Date,
      },
    });
  }

  async updateState(id: string, state: string) {
    return await prisma.task.update({
      where: { id },
      data: {
        state: state,
      },
    });
  }

  async delete(id: string) {
    await prisma.task.delete({ where: { id } });
  }
}
