import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../shares/guards/local-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiResponse({
    type: LoginResponseDto,
    status: HttpStatus.OK,
    description: 'Successful',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Request() request, @Body() loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const { user } = request;
    const res = await this.authService.login(user);
    return plainToInstance(LoginResponseDto, res);
  }
}
