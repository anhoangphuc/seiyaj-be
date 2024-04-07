import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Exclude()
export class RegisterResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'John@email.com',
  })
  @IsString()
  email: string;
}
