import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }
}
