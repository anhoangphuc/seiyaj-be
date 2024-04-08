import { Injectable } from '@nestjs/common';
import { Contract, JsonRpcProvider, Signer, Wallet } from 'ethers';
import { Config } from '../../shares/config';
import Sei from './abi/Sei.json';

@Injectable()
export class SeiService {
  sei: Contract;
  wallet: Signer;
  constructor() {
    this.wallet = new Wallet(Config.SEI_ADMIN, new JsonRpcProvider(Config.RPC_URL));
    this.sei = new Contract(Config.SEI_ADDRESS, Sei.abi, this.wallet);
  }

  async setWhitelist(userAddress: string, amount: bigint) {
    const txHash = await this.sei.setWhitelist(userAddress, amount);
    console.log('Set whitelist success at tx', txHash);
    return txHash;
  }
}
