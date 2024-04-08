import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserAlreadyExistException, UserNotFoundException } from '../../shares/exceptions/users.exception';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor() {
    this.users.push(
      {
        email: 'john@email.com',
        password: 'john',
      },
      {
        email: 'musk@email.com',
        password: 'musk',
      },
    );
  }

  async addNewUser(user: User): Promise<User> {
    if (this.users.find((u) => u.email === user.email)) {
      throw new UserAlreadyExistException(user.email);
    }
    this.users.push(user);
    return user;
  }

  async getUserByEmailAndPassword(email: string, password: string, throwException = true): Promise<User> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user && throwException) {
      throw new UserNotFoundException({ email });
    }
    return user;
  }
}
