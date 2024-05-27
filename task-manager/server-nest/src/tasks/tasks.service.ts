import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';

const prisma = new PrismaClient();
@Injectable()
export class TasksService {
  async getAll(userId: string) {
    return await prisma.task.findMany({ where: { userId: userId } });
  }

  async getOne(userId: string, id: number) {
    return await prisma.task.findUnique({ where: { userId: userId, id: id } });
  }

  async create(
    title: string,
    description: string,
    userId: string,
    upDate: Date,
    state: number,
  ) {
    return await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId,
        stateId: state,
        update: upDate,
      },
    });
  }

  async update(userId: string, id: number, updateTaskDto: CreateTaskDto) {
    return prisma.task.update({
      where: { id: id, userId: userId },
      data: {
        ...updateTaskDto,
        update: new Date(),
      },
    });
  }
  async updateTask(
    userId: string,
    id: number,
    title: string,
    description: string,
  ) {
    return await prisma.task.update({
      where: { id: id, userId: userId },
      data: {
        title: title,
        description: description,
      },
    });
  }

  async updateState(id: number, state: number) {
    return await prisma.task.update({
      where: { id },
      data: {
        stateId: state,
      },
    });
  }

  async delete(id: number) {
    await prisma.task.delete({ where: { id: id } });
  }
}
