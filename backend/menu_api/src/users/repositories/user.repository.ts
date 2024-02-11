import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  users: UserEntity[] = [
    {
      id: '1',
      name: 'Fhilipe',
      email: 'fhilipe@mail.com',
      password: 'Password123',
    },
    {
      id: '2',
      name: 'Eduarda',
      email: 'eduarda@mail.com',
      password: 'Password123',
    },
  ];

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.users.find((user) => user.email === email);
    return user;
  }
}
