import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { Task } from 'src/modules/tasks/dto/create-task.dto';

const prisma = PrismaClient();
@Injectable()
export class TasksService {
  getAll(): Task[] {
    return prisma.task.findMany();
  }

  getOne(id: string): Task {
    return prisma.findunique({ where: { id } });
  }

  async create(task: Task) {
    return prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        userId: task.userId,
        date: task.Date,
      },
    });
  }

  update(id: string, task: Task): Task {
    return prisma.task.update({
      where: { id },
      data: {
        title: task.title,
        description: task.description,
        userId: task.userId,
        date: task.Date,
      },
    });
  }

  updateState(id: string, state: string) {
    return prisma.task.update({
      where: { id },
      data: {
        state: state,
      },
    });
  }

  delete(id: string): void {
    prisma.task.delete({ where: { id } });
  }
}
