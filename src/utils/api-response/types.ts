export interface ApiErrorData {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorData;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ErrorOptions {
  message?: string;
  error?: string;
  details?: Record<string, unknown>;
}
