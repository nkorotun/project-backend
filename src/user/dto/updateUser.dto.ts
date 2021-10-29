import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  image: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;
}
