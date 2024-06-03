import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(email: string, googleId: string): Promise<User> {
    let user = await this.usersService.findUserByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({
        email,
        googleId,
      });
    }
    return user;
  }

  async login(user: any) {
    const payload = user.username
      ? { username: user.username, sub: user.id }
      : { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
