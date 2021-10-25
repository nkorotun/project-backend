import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(AUTH.signIn)
  async login(@Query() body) {
    return this.authService.login(body);
  }

  @Post(AUTH.singUp)
  async register(@Query() body) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AUTH.enter)
  getProfile(@Request() req) {
    return req.user;
  }
}
