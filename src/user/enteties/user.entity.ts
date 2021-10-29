import { ApiProperty } from '@nestjs/swagger';
import { AuthEntity } from 'src/auth/enteties/auth.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'bd4bc467-77a5-4ea9-975b-16d1eebef55d' })
  id!: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  surname: string;

  @OneToOne(() => AuthEntity, (data) => data.user)
  auth: AuthEntity;
}
