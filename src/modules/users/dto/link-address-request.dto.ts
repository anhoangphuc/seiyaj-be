import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString } from 'class-validator';

@Exclude()
export class LinkAddressRequestDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Address want to link',
    example: '0x11...',
  })
  @IsEthereumAddress()
  address: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Signature of the linked message',
    example: '',
    default: '',
  })
  @IsString()
  signature: string;
}
