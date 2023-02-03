import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'modules/auth/authenticated.guard';
import { LocalAuthGuard } from 'modules/auth/local.auth.guard';
import { ChangePasswordDto, CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

const ROUNDS = 12;

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async addUser(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, ROUNDS);

    const result = await this.usersService.insertUser(
      createUserDto.username,
      hashedPassword,
    );

    return {
      requestObject: { userId: result.id, userName: result.username },
      message: 'User successfully registered',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req: any): any {
    return { requestObject: req.user, message: 'User logged in' };
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/user/change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: any,
  ) {
    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      ROUNDS,
    );

    await this.usersService.updatePassword(req.user.id, hashedPassword);

    req.session.destroy();

    return { message: 'Password changed successfully.' };
  }

  @Post('/logout')
  logout(@Req() req): any {
    req.session.destroy();
    return { message: 'The user session has ended' };
  }
}
