import dotenv from 'dotenv';
dotenv.config();
export class Config {
  static readonly PORT = process.env.PORT || 3000;
  static readonly SEI_ADDRESS = '0x251377f397c4DC3A0AA1A552143Ba60E0644E6cf';
  static readonly RPC_URL = 'https://rpc-sepolia.rockx.com';
  static readonly SECRET = process.env.SECRET;
  static readonly SEI_ADMIN = process.env.SEI_ADMIN;
}
