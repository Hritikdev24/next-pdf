// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get roles allowed for this route
    const requiredRoles = this.reflector.getAllAndOverride<string[]>("role", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // no roles required → allow access
    }

    // Get user info from request (comes from JwtStrategy validate())
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.includes(user.role); // check if user's role is allowed
  }
}
