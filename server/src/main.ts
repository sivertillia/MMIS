import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exceptions'
import { ResponseInterceptor } from './interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(process.env.APP_PORT)
  console.log(`Start server port -> ${process.env.APP_PORT}`)
}

bootstrap()
