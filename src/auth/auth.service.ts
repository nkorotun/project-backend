import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './enteties/auth.entyty';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string): Promise<AuthEntity> {
    return this.authRepository.findOne({ username });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(AuthEntity: AuthEntity): Promise<JwtModule> {
    const user = await this.findByUsername(AuthEntity.username);
    if (user) {
      throw new Error('This username is already exist');
    }

    const newUser = await this.authRepository.save(AuthEntity);
    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: AuthEntity): Promise<JwtModule> {
    const data = await this.findByUsername(user.username);
    const payload = { username: data.username, sub: data.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
