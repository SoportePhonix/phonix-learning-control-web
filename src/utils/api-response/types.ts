/**
 * Tipos para el sistema de respuestas API estandarizadas
 */

// Estructura de un error de API
export interface ApiErrorData {
  statusCode: number;
  message: string;
  error?: string;
  details?: Record<string, unknown>;
}

// Respuesta exitosa
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

// Respuesta de error
export interface ApiErrorResponse {
  success: false;
  error: ApiErrorData;
}

// Unión de ambos tipos
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Opciones para personalizar errores
export interface ErrorOptions {
  message?: string;
  error?: string;
  details?: Record<string, unknown>;
}
