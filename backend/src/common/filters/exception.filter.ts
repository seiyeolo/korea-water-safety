import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorDetails {
  [key: string]: string[];
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
    details?: ErrorDetails;
    timestamp: string;
    path?: string;
  };
}

/**
 * 모든 HTTP 예외를 캐치하고 표준화된 에러 응답 형식으로 반환
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 에러 메시지와 코드 추출
    let errorMessage = 'Internal Server Error';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let details: ErrorDetails | undefined;

    if (typeof exceptionResponse === 'object') {
      const errorObj = exceptionResponse as any;
      errorMessage = errorObj.message || errorMessage;

      // ValidationPipe 에러 처리
      if (Array.isArray(errorMessage)) {
        details = this.formatValidationErrors(errorMessage);
        errorMessage = '입력 검증에 실패했습니다';
        errorCode = 'VALIDATION_ERROR';
      } else if (typeof errorMessage === 'string') {
        // 에러 코드 유추
        if (status === HttpStatus.BAD_REQUEST) {
          errorCode = 'BAD_REQUEST';
        } else if (status === HttpStatus.UNAUTHORIZED) {
          errorCode = 'UNAUTHORIZED';
        } else if (status === HttpStatus.FORBIDDEN) {
          errorCode = 'FORBIDDEN';
        } else if (status === HttpStatus.NOT_FOUND) {
          errorCode = 'NOT_FOUND';
        } else if (status === HttpStatus.CONFLICT) {
          errorCode = 'CONFLICT';
        } else if (status >= 500) {
          errorCode = 'INTERNAL_SERVER_ERROR';
        }
      }
    }

    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        statusCode: status,
        ...(details && { details }),
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    response.status(status).json(errorResponse);
  }

  /**
   * ValidationPipe 에러를 읽기 좋은 형식으로 변환
   */
  private formatValidationErrors(errors: any[]): ErrorDetails {
    const details: ErrorDetails = {};

    errors.forEach((error) => {
      if (error.property && error.constraints) {
        details[error.property] = Object.values(error.constraints) as string[];
      }
    });

    return details;
  }
}

/**
 * 모든 예외를 캐치하는 글로벌 예외 필터
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const errorObj = exceptionResponse as any;
        message = errorObj.message || message;
      } else {
        message = exceptionResponse as string;
      }
    } else if (exception instanceof Error) {
      console.error('Unexpected Error:', exception);
      message = exception.message;
    }

    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    response.status(status).json(errorResponse);
  }
}
