import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import {
  UserAlreadyExistException,
  UserAlreadyLinkAddress,
  UserNotFoundException,
  UserNotLinkAddressYet,
} from '../../shares/exceptions/users.exception';
import { ScService } from '../sc/sc.service';
import { randomInt } from '../../shares/utils/random-utils';
import { WeiPerEther } from 'ethers';
import { sleep } from '../../shares/utils/util';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private readonly scService: ScService) {
    this.users.push(
      {
        email: 'john@email.com',
        password: 'john',
        address: null,
      },
      {
        email: 'musk@email.com',
        password: 'musk',
        address: null,
      },
    );
  }

  async addNewUser(user: Omit<User, 'address'>): Promise<User> {
    if (this.users.find((u) => u.email === user.email)) {
      throw new UserAlreadyExistException(user.email);
    }
    this.users.push({ ...user, address: null });
    return { ...user, address: null };
  }

  async getUserByEmailAndPassword(email: string, password: string, throwException = true): Promise<User> {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user && throwException) {
      throw new UserNotFoundException({ email });
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async linkETHAddress(email: string, address: string, signature: string): Promise<User> {
    console.log('Signature', signature);
    const user = this.users.find((u) => u.email === email);
    const index = this.users.findIndex((u) => u.email === email);
    if (this.users[index].address != null) {
      throw new UserAlreadyLinkAddress(email);
    }
    this.users[index] = { ...user, address };
    return this.users[index];
  }

  async requestWhitelist(email: string) {
    const user = await this.getUserByEmail(email);
    if (user.address === null) {
      throw new UserNotLinkAddressYet(email);
    }
    // This amount is random, faked that backend set appropriate amount,
    // From 1 to 1000 Sei
    const amount = BigInt(randomInt()) * WeiPerEther;
    await this.scService.setWhitelist(user.address, amount);
    return {
      email,
      address: user.address,
      amount,
    };
  }
}
