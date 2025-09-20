import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth-entity/createUserSchema';
import { LocalStrategy } from './localStratey';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // load .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // optional
      }),
    }),
    MongooseModule.forFeature([{ name: 'userModel', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], 
})
export class AuthModule {}
