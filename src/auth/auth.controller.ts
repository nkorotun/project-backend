import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller(AUTH.dist)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AUTH.signIn)
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post(AUTH.singUp)
  async register(@Body() body) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH.enter)
  getProfile(@Request() req) {
    return req.user;
  }
}
