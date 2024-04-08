import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class LoginRequestDto {
  @Expose()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'john@email.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: '1',
  })
  @IsString()
  password: string;
}
