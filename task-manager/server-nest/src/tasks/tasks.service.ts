import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

const prisma = new PrismaClient();
@Injectable()
export class TasksService {
  async getAll(userId: string) {
    return await prisma.task.findMany({
      where: { userId: userId },
      include: { state: true },
    });
  }

  async getOne(userId: string, id: number) {
    return await prisma.task.findUnique({
      where: { userId: userId, id: id },
      include: { state: true },
    });
  }

  async create(userId: string, createTaskDto: CreateTaskDto) {
    return await prisma.task.create({
      data: {
        ...createTaskDto,
        update: new Date(),
        userId: userId,
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
