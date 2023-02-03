import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}
  async insertUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({
      username,
      password,
      lastPasswordChange: moment().toDate(),
    });
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === 11000)
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User already exists.',
          },
          HttpStatus.CONFLICT,
        );
    }

    return newUser;
  }

  async updatePassword(id: string, newPassword: string) {
    await this.userModel.updateOne(
      { id },
      {
        password: newPassword,
        lastPasswordChange: moment().toDate(),
      },
    );
  }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = await this.userModel.findOne({ username });

    return user;
  }
}
