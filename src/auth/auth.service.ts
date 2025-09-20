import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDoc } from './auth-entity/createUserSchema';
import { Model } from 'mongoose';
import { CreateUserDto } from './auth-dto/createUserDto';
import { LoginDto } from './auth-dto/loginDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('userModel') private readonly userModel: Model<UserDoc>,
    private readonly jwtService: JwtService,
    private readonly configSerive:ConfigService
  ) {}

  async registration(userData: CreateUserDto) {
    return await this.userModel.create(userData);
  }

  async validateUser(userLogin: LoginDto) {
    const user = await this.userModel.findOne({
      userName: userLogin.userName,
      password: userLogin.password,
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  async generateToken(user) {
    // Payload you want inside the token
    const payload = {
      userId: user.id, // subject = user id
      username: user.userName,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
     
      const payload = this.jwtService.verify(refreshToken, {
        secret:this.configSerive.get<string>("JWT_SERVICE")
      });

    
      const accessToken = this.jwtService.sign(
        { userId: payload.userId, role: payload.role },
        {
          secret:this.configSerive.get<string>("JWT_SERVICE"),
          expiresIn: '15m',
        },
      );

      return accessToken;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
