import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class TasksService {
  async getAll(userId: string) {
    return await prisma.task.findMany({ where: { userId } });
  }

  async getOne(id: number) {
    return await prisma.task.findUnique({ where: { id } });
  }

  async create(title: string, description: string, userId: string, Date: Date) {
    const state = await prisma.state.create({ data: { name: 'pending' } });

    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId,
        stateId: state.id,
        update: Date,
      },
    });

    return newTask;
  }

  async update(id: number, title: string, description: string) {
    return await prisma.task.update({
      where: { id },
      data: {
        title: title,
        description: description,
      },
    });
  }

  async updateState(id: number, state: string) {
    return await prisma.state.update({
      where: { id },
      data: {
        name: state,
      },
    });
  }

  async delete(id: number) {
    await prisma.task.delete({ where: { id } });
  }
}
