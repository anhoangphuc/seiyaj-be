import { PublicUserInfoResponseDto } from './public-user-info.response.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress } from 'class-validator';

@Exclude()
export class UserInfoResponseDto extends PublicUserInfoResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Address of user',
    example: '0x11...',
  })
  @IsEthereumAddress()
  address: string;
}
