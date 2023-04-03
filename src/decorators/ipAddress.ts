import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const IpAddress = createParamDecorator(
  (data: unknown, context: ExecutionContext) => GqlExecutionContext.create(context).getContext().req.ip
);
