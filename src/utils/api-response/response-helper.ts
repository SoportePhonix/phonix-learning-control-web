import { NextResponse } from 'next/server';

import { HttpError, HttpErrors } from './http-errors';
import { ApiErrorResponse, ApiSuccessResponse, ErrorOptions } from './types';

export class ApiResponseHelper {
  static success<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
    });
  }

  static error(httpError: HttpError, options?: ErrorOptions): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false,
      error: {
        statusCode: httpError.statusCode,
        message: options?.message ?? httpError.message,
        error: options?.error ?? httpError.error,
        ...(options?.details && { details: options.details }),
      },
    });
  }

  static customError(statusCode: number, message: string, error?: string): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false,
      error: {
        statusCode,
        message,
        ...(error && { error }),
      },
    });
  }

  static fromException(err: unknown, fallbackMessage = 'Internal server error'): NextResponse<ApiErrorResponse> {
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      const apiError = err as { statusCode: number; message?: string; error?: string };
      return this.customError(apiError.statusCode, apiError.message ?? fallbackMessage, apiError.error);
    }

    if (err instanceof Error) {
      return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
        message: err.message || fallbackMessage,
      });
    }

    return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
      message: fallbackMessage,
    });
  }

  static fromExternalResponse(response: {
    statusCode?: number;
    message?: string;
    error?: string;
  }): NextResponse<ApiErrorResponse> | null {
    if (response.statusCode === 404) {
      return this.error(HttpErrors.NOT_FOUND, {
        message: response.message,
        error: response.error,
      });
    }

    if (response.statusCode === 401) {
      return this.error(HttpErrors.UNAUTHORIZED, {
        message: response.message,
        error: response.error,
      });
    }

    if (response.statusCode === 403) {
      return this.error(HttpErrors.FORBIDDEN, {
        message: response.message,
        error: response.error,
      });
    }

    if (response.error || (response.statusCode && response.statusCode >= 400)) {
      return this.customError(response.statusCode ?? 500, response.message ?? 'Unknown error', response.error);
    }

    return null;
  }
}

export const ApiRes = ApiResponseHelper;
