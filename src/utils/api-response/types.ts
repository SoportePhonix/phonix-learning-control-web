/**
 * Tipos base para definir respuestas estandarizadas de la API.
 * Esto permite que todas las respuestas sigan la misma estructura,
 * facilitando su manejo en frontend y debugging.
 */

// Estructura de un error de API
export interface ApiErrorData {
  statusCode: number; // Código HTTP (400, 404, 500, etc.)
  message: string; // Mensaje de error
  error?: string; // Tipo de error
  details?: Record<string, unknown>; // Información adicional
}

// Respuesta exitosa
export interface ApiSuccessResponse<T = unknown> {
  success: true; // Indica que la operación salió bien
  data: T; // Datos devueltos por la API
}

// Respuesta de error
export interface ApiErrorResponse {
  success: false; // Indica que hubo error
  error: ApiErrorData; // Información del error
}

// Unión de ambos tipos
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// Opciones para personalizar errores
export interface ErrorOptions {
  message?: string;
  error?: string;
  details?: Record<string, unknown>;
}
