import { Injectable } from '@nestjs/common';
import { SeiService } from './sei.service';

@Injectable()
export class ScService {
  constructor(private readonly seiService: SeiService) {}

  async setWhitelist(userAddress: string, amount: bigint) {
    return await this.seiService.setWhitelist(userAddress, amount);
  }

  async getWhitelistAmount(userAddress: string) {
    return await this.seiService.getWhitelistAmount(userAddress);
  }
}
