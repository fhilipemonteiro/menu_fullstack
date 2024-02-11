import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadDTO } from '../dto/payload.dto';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtAuthService: JwtService) {}

  async generateToken(payload: PayloadDTO): Promise<string> {
    return await this.jwtAuthService.signAsync(payload);
  }
}
