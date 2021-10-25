import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {}
