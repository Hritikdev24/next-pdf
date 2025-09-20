import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string | null => {
    const req = ctx.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]; 
    }
    return null;
  },
);
