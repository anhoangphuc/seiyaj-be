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
import { hashString, isHashEqual } from '../../shares/utils/cryptography';

@Injectable()
export class UsersService {
  private users: User[] = [];
  constructor(private readonly scService: ScService) {
    this.users.push(
      {
        email: 'john@email.com',
        // password: john
        password: '$2b$10$/fJiwaStbCtO4TOWh.qiqOpjT0LUFiQuN7XyGwawItJe/2FAVMMhy',
        address: null,
      },
      {
        email: 'musk@email.com',
        //password: musk
        password: '$2b$10$nGB8U4xEmqrchANJ/2wks.GjDA6rvCO1mzwhtYQgUFAquKoHuY0j2',
        address: null,
      },
    );
  }

  async addNewUser(user: Omit<User, 'address'>): Promise<User> {
    if (this.users.find((u) => u.email === user.email)) {
      throw new UserAlreadyExistException(user.email);
    }
    user.password = await hashString(user.password);
    this.users.push({ ...user, address: null });
    return { ...user, address: null };
  }

  async getUserByEmailAndPassword(email: string, password: string, throwException = true): Promise<User> {
    let user = this.users.find((u) => u.email === email);
    if ((await isHashEqual(password, user.password)) === false) user = null;
    if (!user && throwException) {
      throw new UserNotFoundException({ email, password });
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
