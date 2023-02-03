import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { PASSWORD_CHANGE_AFTER } from '../../config';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);

    if (!user) throw new NotAcceptableException('Could not find the user.');

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
        needToChangePassword: moment()
          .subtract(PASSWORD_CHANGE_AFTER, 'd')
          .isAfter(moment(user.lastPasswordChange)),
      };
    }

    return null;
  }
}
