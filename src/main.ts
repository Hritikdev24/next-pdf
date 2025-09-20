import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './response/response.interceptor';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port=configService.get('PORT') ?? 3000;
  app.useLogger(false);
  app.setGlobalPrefix("api");
  app.enableCors({
      origin:"*",
      credential:true
  });
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`server has been running on ${port}`);
}
bootstrap();
