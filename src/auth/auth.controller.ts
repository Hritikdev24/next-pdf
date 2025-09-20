import { Controller, UseGuards,UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Get, Body ,Req ,Res} from '@nestjs/common';
import { CreateUserDto } from './auth-dto/createUserDto';
import { Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/rolw/rolw.decorator';
import { RefreshToken } from 'src/refreshtoken/refreshtoken.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req) {
    const payload = {
      id: req.user._id,
      userName: req.user.userName,
      role: req.user.role,
    };
    return this.authService.generateToken(payload);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Role('admin')
  @Get('logined')
  isLogged() {
    return true;
  }


  @Get('refresh-token')
  async getNewToken(@RefreshToken() refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return this.authService.refreshTokens(refreshToken);
  }

}
