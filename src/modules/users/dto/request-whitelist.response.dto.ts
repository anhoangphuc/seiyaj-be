import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RequestWhitelistResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'john@email.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Address of the user',
    example: '0x11...',
  })
  address: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Amount of airdrop user',
    example: '1000000000000000000000',
  })
  @Transform(({ value }) => value.toString())
  amount: string;
}
