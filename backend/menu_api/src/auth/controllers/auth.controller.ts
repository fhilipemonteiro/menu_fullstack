import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDTO } from '../dto';
import { Response } from 'express';
import { Public } from '../decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() login: LoginDTO, @Res() res: Response) {
    return await this.authService.login(login, res);
  }
}
