import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorResponse implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const { message, name: error } = exception;

    console.log('error:::', error);

    response.status(statusCode).json({
      statusCode: exception.getStatus(),
      message,
      error,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
