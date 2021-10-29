import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/enteties/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id!: string;

  @Column()
  @ApiProperty({ example: 'test@email.com' })
  email: string;

  @Column()
  @ApiProperty({ example: 'root1234' })
  password: string;

  @OneToOne(() => UserEntity, (data) => data.auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}
