import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.findUserByUsername(username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });

      // Excluir el campo password antes de retornar el usuario
      const { password: _, ...result } = newUser;
      return result;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { username },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by username');
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by ID');
    }
  }
}
