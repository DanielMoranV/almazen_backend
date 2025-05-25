import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core'; // Not needed for this version

@Injectable()
export class CompanyGuard implements CanActivate {
  // constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user || !user.position) { // company_id presence check depends on role
      throw new ForbiddenException('User information is missing or incomplete for company check.');
    }

    // 'developer' role has access to any company's resources
    if (user.position === 'developer') {
      return true;
    }
    
    // Non-developers must have a company_id
    if (!user.company_id) {
        throw new ForbiddenException('User company information is missing.');
    }

    const paramsCompanyId = request.params.companyId;

    if (paramsCompanyId) {
      if (user.company_id === paramsCompanyId) {
        return true;
      }
      // If companyId is in params but doesn't match, and user is not developer
      throw new ForbiddenException('You do not have access to this company\'s resources.');
    }

    // If companyId is NOT in params, and user is not 'developer':
    // The subtask states: "If companyId is present in route params, compare it...".
    // It implies the guard's main role is for routes with :companyId.
    // If the route doesn't have :companyId, this guard, by this logic, shouldn't block.
    // However, a guard named CompanyGuard implies it always checks company context.
    // A safer default for a non-developer on a route without :companyId in params
    // (but where CompanyGuard is applied) would be to deny access, as the company context is ambiguous.
    // Or, it could mean the resource is not company-specific, or company is derived differently (e.g. for creating a new company).
    // For this implementation, if CompanyGuard is used on a route without :companyId,
    // and the user is not a developer, we will deny access because the context is not specific enough
    // to confirm they are operating within their own company's scope via URL param.
    // This is a stricter interpretation than my previous version.
    throw new ForbiddenException('Access denied: Company context cannot be verified for this request.');
  }
}
