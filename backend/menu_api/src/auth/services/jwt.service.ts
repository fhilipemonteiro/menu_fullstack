import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDTO } from '../dto';
import 'dotenv/config';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtAuthService: JwtService) {}

  async generateToken(payload: PayloadDTO): Promise<string> {
    return await this.jwtAuthService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<object> {
    const payload = await this.jwtAuthService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });
    return payload;
  }
}
