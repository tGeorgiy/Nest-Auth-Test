import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DB_HOST } from './config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(DB_HOST, { dbName: 'nest-test' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
