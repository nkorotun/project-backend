import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id!: string;

  @Column()
  @ApiProperty({ example: 'test@email.com' })
  username: string;

  @Column()
  @ApiProperty({ example: 'root1234' })
  password: string;
}
