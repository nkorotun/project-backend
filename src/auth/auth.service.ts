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

  async findByEmail(email: string): Promise<AuthEntity> {
    return this.authRepository.findOne({ email });
  }

  async validateUser(email: string, pass: string): Promise<object | null> {
    const user = await this.findByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(AuthEntity: AuthEntity): Promise<JwtModule> {
    const user = await this.findByEmail(AuthEntity.email);
    if (user) {
      throw new Error('This email is already exist');
    }

    const newUser = await this.authRepository.save(AuthEntity);
    const payload = { email: newUser.email, sub: newUser.id };
    return {
      email: newUser.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: AuthEntity): Promise<JwtModule> {
    const data = await this.findByEmail(user.email);
    if (data.password !== user.password) {
      throw new Error('Wrong mail or password');
    }
    const payload = { email: data.email, sub: data.id };
    return {
      email: data.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
