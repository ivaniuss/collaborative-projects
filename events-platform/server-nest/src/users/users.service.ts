import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const { username, password, email } = createUserDto;
    const existingUserByUsername = await this.findUserByUsername(username);
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.usersRepository.save(newUser);
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({
        where: {
          username,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by username');
    }
  }
}
