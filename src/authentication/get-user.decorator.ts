import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '../user-management/entities';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserModel => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
