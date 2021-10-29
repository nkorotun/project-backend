import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './enteties/auth.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/enteties/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<AuthEntity> {
    return await this.authRepository.findOne({
      where: { email },
      relations: ['user'],
    });
  }

  async validateUser(email: string, pass: string): Promise<object | null> {
    const user = await this.authRepository.findOne({
      where: { email },
      relations: ['user'],
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(authData: AuthEntity): Promise<JwtModule> {
    const user = await this.findByEmail(authData.email);
    if (user) {
      throw new Error('This email is already exist');
    }

    const newUser = await this.authRepository.save(authData);

    const userInfo = await this.userRepository.save({
      auth: newUser,
      name: '',
      surname: '',
    });

    const payload = { email: newUser.email, sub: newUser.id };
    return {
      email: newUser.email,
      access_token: this.jwtService.sign(payload),
      userInfo,
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
