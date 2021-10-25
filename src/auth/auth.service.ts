import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async register(AuthEntity: AuthEntity): Promise<AuthEntity> {
    const checkUser = await this.findByUsername(AuthEntity.username);
    if (checkUser) {
      throw new Error('This username is booked');
    }
    return this.authRepository.save(AuthEntity);
  }

  async login(user: AuthEntity) {
    const data = await this.validateUser(user.username, user.password);
    const payload = { username: data.username, sub: data.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
