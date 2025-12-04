import { NextResponse } from 'next/server';

import { HttpError, HttpErrors } from './http-errors';
import { ApiErrorResponse, ApiSuccessResponse, ErrorOptions } from './types';

/**
 * Helper para crear respuestas API estandarizadas
 */
export class ApiResponseHelper {
  /**
   * Crea una respuesta exitosa
   * @param data - Los datos a devolver
   */
  static success<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true as const,
      data,
    });
  }

  /**
   * Crea una respuesta de error usando un error HTTP predefinido
   * @param httpError - Error del catálogo HttpErrors (ej: HttpErrors.NOT_FOUND)
   * @param options - Opciones para personalizar el mensaje
   */
  static error(httpError: HttpError, options?: ErrorOptions): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false as const,
      error: {
        statusCode: httpError.statusCode,
        message: options?.message ?? httpError.message,
        error: options?.error ?? httpError.error,
        ...(options?.details && { details: options.details }),
      },
    });
  }

  /**
   * Crea una respuesta de error con código personalizado
   * @param statusCode - Código HTTP
   * @param message - Mensaje de error
   * @param error - Tipo de error (opcional)
   */
  static customError(statusCode: number, message: string, error?: string): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false as const,
      error: {
        statusCode,
        message,
        ...(error && { error }),
      },
    });
  }

  /**
   * Maneja excepciones y las convierte en respuestas de error
   * @param err - El error capturado
   * @param fallbackMessage - Mensaje por defecto si no se puede extraer del error
   */
  static fromException(err: unknown, fallbackMessage = 'Internal server error'): NextResponse<ApiErrorResponse> {
    // Si es un error con statusCode (probablemente de la API externa)
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      const apiError = err as { statusCode: number; message?: string; error?: string };
      return this.customError(apiError.statusCode, apiError.message ?? fallbackMessage, apiError.error);
    }

    // Si es un Error estándar de JavaScript
    if (err instanceof Error) {
      return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
        message: err.message || fallbackMessage,
      });
    }

    // Fallback genérico
    return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
      message: fallbackMessage,
    });
  }

  /**
   * Evalúa una respuesta de API externa y devuelve error si corresponde
   * Retorna null si la respuesta es exitosa
   * @param response - Respuesta de la API externa
   */
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

    return null; // No hay error
  }
}

// Alias corto para uso más cómodo
export const ApiRes = ApiResponseHelper;
