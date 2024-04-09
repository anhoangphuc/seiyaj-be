import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Exclude()
export class LoginResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvYW5',
  })
  @IsString()
  accessToken: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'john@gmail.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'john@gmail.com',
  })
  address: string;
}
