import { createParamDecorator, ExecutionContext } from '@nestjs/common'

type UserInfo = {
  role: 'USER' | 'ADMIN'
  user_id: number
}

const factory = (data, ctx: ExecutionContext): UserInfo => {
  const request = ctx.switchToHttp().getRequest()
  return request?.user
}

export const User = createParamDecorator(factory)
