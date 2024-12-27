import { HttpStatus } from '@nestjs/common';
import { PaginationType } from 'src/types/global';

export function responseWrapper(
  statusCode: HttpStatus,
  message: string,
  data: any = null,
  pagination: PaginationType,
) {
  return {
    statusCode,
    message,
    data,
    pagination,
  };
}
