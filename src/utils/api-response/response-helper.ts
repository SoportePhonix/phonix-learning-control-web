import { NextResponse } from 'next/server';

// NextResponse permite devolver respuestas desde los Route Handlers de Next.js.
import { HttpError, HttpErrors } from './http-errors';
// Catálogo de errores ya definidos con mensajes y códigos HTTP.
import { ApiErrorResponse, ApiSuccessResponse, ErrorOptions } from './types';

// Tipos para garantizar que las respuestas mantengan la misma estructura.

/**
 * Helper que centraliza toda la construcción de respuestas de la API.
 * Permite crear respuestas de éxito, error y manejar excepciones de forma consistente.
 */
export class ApiResponseHelper {
  /**
   * Respuesta exitosa.
   * Devuelve un objeto con { success: true, data }
   */
  static success<T>(data: T): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
    });
  }

  /**
   * Respuesta de error basada en un error HTTP predefinido.
   * Permite sobreescribir mensaje, error o detalles.
   */
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

  /**
   * Respuesta de error personalizada sin depender del catálogo.
   */
  static customError(statusCode: number, message: string, error?: string): NextResponse<ApiErrorResponse> {
    return NextResponse.json({
      success: false,
      error: {
        statusCode,
        message,
        ...(error && { error }), // Solo agrega "error" si fue enviado
      },
    });
  }

  /**
   * Convierte una excepción (throw) en una respuesta estándar de error.
   * Útil para try/catch en APIs.
   */
  static fromException(err: unknown, fallbackMessage = 'Internal server error'): NextResponse<ApiErrorResponse> {
    // Si el error tiene statusCode, probablemente viene de una API externa o validación.
    if (typeof err === 'object' && err !== null && 'statusCode' in err) {
      const apiError = err as { statusCode: number; message?: string; error?: string };
      return this.customError(apiError.statusCode, apiError.message ?? fallbackMessage, apiError.error);
    }

    // Error estándar de JavaScript
    if (err instanceof Error) {
      return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
        message: err.message || fallbackMessage,
      });
    }

    // Error desconocido
    return this.error(HttpErrors.INTERNAL_SERVER_ERROR, {
      message: fallbackMessage,
    });
  }

  /**
   * Valida una respuesta externa (de otra API).
   * Si contiene error → lo convierte a tu formato estándar.
   * Si no hay error → devuelve null.
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

    // Cualquier otro error 4xx o 5xx
    if (response.error || (response.statusCode && response.statusCode >= 400)) {
      return this.customError(response.statusCode ?? 500, response.message ?? 'Unknown error', response.error);
    }

    return null; // No hay error → respuesta válida
  }
}

// Alias corto para usar en los controladores
export const ApiRes = ApiResponseHelper;
