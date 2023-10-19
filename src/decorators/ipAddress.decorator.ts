import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

const IpAddress = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  const ctxHeaders = ctx.getContext().req.headers

  if (!ctxHeaders['x-real-ip']) {
    return ctxHeaders['x-forwarded-for']
  }
  return ctxHeaders['x-real-ip']
})

export default IpAddress
