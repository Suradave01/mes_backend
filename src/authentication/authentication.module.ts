import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModel } from 'src/user-management/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from './constant';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([UserModel]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticationModule {}
