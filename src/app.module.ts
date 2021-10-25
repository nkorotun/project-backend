import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth/enteties/auth.entyty';
import { DB } from './constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DB.type,
      host: DB.host,
      port: DB.port,
      username: DB.username,
      password: DB.password,
      database: DB.database,
      entities: [AuthEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
