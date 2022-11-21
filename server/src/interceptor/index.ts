import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Response } from '../helpers'


@Injectable()
export class ResponseInterceptor implements NestInterceptor<Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()

    return next.handle().pipe(
      map((value) => {
        return new Response({
          status_code: HttpStatus.OK,
          path: req.url,
          data: value,
        })
      }),
    )
  }
}
