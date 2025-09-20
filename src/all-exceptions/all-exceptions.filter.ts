import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // If it's an HttpException, extract status code, else 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // If it's an HttpException, get response body, else generic
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    // Build error response
    const errorResponse = {
      success: false,
      path: request.url,
      timestamp: new Date().toISOString(),
      statusCode: status,
      message:
        (exceptionResponse as any)?.message || (exception as any)?.message || 'Internal server error',
    };

    response.status(status).json(errorResponse);
  }
}
