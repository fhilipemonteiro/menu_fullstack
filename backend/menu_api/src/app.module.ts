import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: Number(process.env.PORT_DB),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      entities: [],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
