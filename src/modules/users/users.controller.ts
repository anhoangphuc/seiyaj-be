import { Controller, Post, UseGuards, Request, Body, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../shares/guards/jwt-auth.guard';
import { LinkAddressRequestDto } from './dto/link-address-request.dto';
import { UserInfoResponseDto } from './dto/user-info.response.dto';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { RequestWhitelistResponseDto } from './dto/request-whitelist.response.dto';

@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('link-address')
  @ApiOperation({
    operationId: 'user-link-eth-address',
    description: 'User link ETH address',
    summary: 'User link ETH address',
  })
  @ApiBody({
    type: LinkAddressRequestDto,
  })
  @ApiResponse({
    type: UserInfoResponseDto,
    description: 'Successful',
    status: HttpStatus.OK,
  })
  async linkAddress(@Request() request, @Body() linkRequest: LinkAddressRequestDto): Promise<UserInfoResponseDto> {
    const res = await this.usersService.linkETHAddress(request.user.email, linkRequest.address, linkRequest.signature);
    return plainToInstance(UserInfoResponseDto, res);
  }

  @Post('request-whitelist')
  @ApiOperation({
    operationId: 'user-request-whitelist',
    description: 'User request whitelist to receive airdrop',
    summary: 'User request whitelist to receive airdrop',
  })
  @ApiResponse({
    type: RequestWhitelistResponseDto,
    description: 'Successful',
    status: HttpStatus.OK,
  })
  async requestWhitelist(@Request() request): Promise<RequestWhitelistResponseDto> {
    const res = await this.usersService.requestWhitelist(request.user.email);
    return plainToInstance(RequestWhitelistResponseDto, res);
  }
}
