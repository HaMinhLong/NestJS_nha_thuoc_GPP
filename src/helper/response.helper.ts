import { HttpStatus } from '@nestjs/common';

export function responseWrapper(
  statusCode: HttpStatus,
  message: string,
  data: any = null,
) {
  return {
    statusCode,
    message,
    data,
  };
}
