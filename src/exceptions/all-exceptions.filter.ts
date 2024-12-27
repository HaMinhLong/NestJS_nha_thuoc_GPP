import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let stack = null;

    // Kiểm tra nếu lỗi là TokenExpiredError
    if (exception instanceof TokenExpiredError) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: 'Token has expired',
        error: 'Unauthorized',
      });
      return; // Kết thúc sớm, không xử lý tiếp
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (exception instanceof HttpException) {
      stack = (exception as any).stack;
    } else if (exception instanceof Error) {
      stack = exception.stack;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'string' ? message : (message as any)?.message,
      error: message,
      stack,
    });
  }
}
