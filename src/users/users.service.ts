import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async addOne(username: string, password: string): Promise<User | undefined> {
    this.users.push({
      userId: Math.random(),
      username: username,
      password: password,
    });
    return this.users;
  }
}
