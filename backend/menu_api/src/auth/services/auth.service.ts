import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/users/services/user.service';
import { LoginDTO } from '../dto/login.dto';
import { JwtAuthService } from './jwt.service';
import { PayloadDTO } from '../dto/payload.dto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async login(login: LoginDTO, @Res() res: Response) {
    try {
      const user = await this.userService.getUserByEmail(login.email);

      if (!user || login.password !== user.password) {
        res.status(404).json({
          message: 'Email or password incorrect.',
        });
      }

      const payload: PayloadDTO = {
        sub: user.id,
        email: user.email,
      };

      const token = await this.jwtAuthService.generateToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch {
      res.status(500).send({
        message: 'Internal Server Error.',
      });
    }
  }
}
