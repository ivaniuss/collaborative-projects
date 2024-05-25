import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class StateService {
  async getState(id: number) {
    return await prisma.state.findUnique({ where: { id: id } });
  }

  async getAll() {
    return await prisma.state.findMany();
  }
}
