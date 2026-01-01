import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Custom decorator to extract the current authenticated user
 * from the GraphQL execution context
 * 
 * Usage in resolvers:
 * @Query()
 * async someQuery(@CurrentUser() user: any) {
 *   // user contains the decoded JWT payload
 * }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
