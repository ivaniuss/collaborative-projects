import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

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

  async validateOAuthUser(
    provider: string,
    providerId: string,
    email?: string,
  ): Promise<User> {
    let user = await this.usersService.findUserByProvider(provider, providerId);
    if (!user && email) {
      user = await this.usersService.findUserByEmail(email);
      if (user) {
        await this.usersService.linkAuthProvider(user.id, provider, providerId);
      } else {
        user = await this.usersService.createUser({ email });
        await this.usersService.linkAuthProvider(user.id, provider, providerId);
      }
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
