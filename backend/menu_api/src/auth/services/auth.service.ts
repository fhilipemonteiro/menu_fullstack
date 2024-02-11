import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/services/user.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(login: LoginDTO, @Res() res: Response) {
    const user = await this.userService.getUserByEmail(login.email);

    if (!user || login.password !== user.password) {
      return res.status(404).json({
        message: 'Email or password incorrect.',
      });
    }

    return res.status(200).json(user);
  }
}
