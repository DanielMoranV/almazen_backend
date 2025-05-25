import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles specified, access granted
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.position) {
      throw new ForbiddenException('User information is missing or incomplete.');
    }

    const hasRequiredRole = requiredRoles.some((role) => user.position === role);

    if (hasRequiredRole) {
      return true;
    }

    throw new ForbiddenException('You do not have the required role to access this resource.');
  }
}
