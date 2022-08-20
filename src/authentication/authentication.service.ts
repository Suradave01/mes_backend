import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user-management/entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserModel)
    private UserModelRepository: Repository<UserModel>,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, email, password } = authCredentialsDto;
    if (username) {
      const user = await this.UserModelRepository.findOne({ username });
      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = {
          username: user.username,
          user_id: user.id,
          is_system: user.is_system,
        };
        return { accessToken: this.jwtService.sign(payload) };
      } else {
        throw new UnauthorizedException('Please check your login credentials.');
      }
    } else if (email) {
      const user = await this.UserModelRepository.findOne({ email });
      if (email && (await bcrypt.compare(password, user.password))) {
        const payload = { email };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials.');
      }
    }
  }

  async signOut() {}
}
