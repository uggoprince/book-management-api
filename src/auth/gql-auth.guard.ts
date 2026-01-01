import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * GraphQL Authentication Guard
 * Extends Passport's AuthGuard to work with GraphQL context
 * instead of REST request context
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  /**
   * Override getRequest to extract the request from GraphQL context
   * This is necessary because GraphQL has a different execution context
   * than REST endpoints
   */
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
