import dotenv from 'dotenv';
dotenv.config();
export class Config {
  static readonly PORT = process.env.PORT || 3000;
  static readonly SECRET = process.env.SECRET;
}
