import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { CreateException } from '../exceptions/nocontent.exception'
import { API_ERROR_CODES } from '../enum/errorsCodes'
import * as jwt from 'jsonwebtoken'


@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) throw new CreateException(API_ERROR_CODES.UNAUTHORIZED)
    const bearer = authHeader.split(' ')[0]
    const token = authHeader.split(' ')[1]

    if (bearer !== 'Bearer' || !token) throw new CreateException(API_ERROR_CODES.UNAUTHORIZED)
    let decoded

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
      throw new CreateException(API_ERROR_CODES.UNAUTHORIZED)
    }
    if (!decoded) throw new CreateException(API_ERROR_CODES.UNAUTHORIZED)
    request.user = decoded

    return true
  }
}
