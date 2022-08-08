import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/user-management/entities';
import { Repository } from 'typeorm';
import { jwtConstants } from '../constant';
import { JwtPayload } from '../jwt.payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserModel)
    private UserModelRepository: Repository<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserModel> {
    const { username, email } = payload;
    if (username) {
      const user: UserModel = await this.UserModelRepository.findOne({
        username,
      });
      return user;
    } else if (email) {
      const user: UserModel = await this.UserModelRepository.findOne({ email });
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
