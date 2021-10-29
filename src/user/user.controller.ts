import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER } from './constants';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './enteties/user.entity';
import { UserService } from './user.service';

@Controller(USER.dist)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Updating user' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
