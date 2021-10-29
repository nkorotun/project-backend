import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './enteties/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByid(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserData: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, { ...updateUserData });
    return this.userRepository.findOne(id);
  }
}
