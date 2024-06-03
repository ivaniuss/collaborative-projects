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
    const { username, password, email, googleId } = createUserDto;

    let newUser: User;

    if (username && password) {
      const existingUserByUsername = await this.findUserByUsername(username);
      if (existingUserByUsername) {
        throw new ConflictException('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
    } else if (email && googleId) {
      const existingUserByEmail = await this.findUserByEmail(email);
      if (existingUserByEmail) {
        throw new ConflictException('Email already exists');
      }
      newUser = this.usersRepository.create(createUserDto);
    } else {
      throw new InternalServerErrorException('Invalid user data');
    }

    try {
      const savedUser = await this.usersRepository.save(newUser);
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
