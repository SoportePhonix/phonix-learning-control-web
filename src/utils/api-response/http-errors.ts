/**
 * Catálogo de errores HTTP.
 * Cada entrada define un statusCode, mensaje y tipo de error.
 * Se usa junto con ApiResponseHelper para enviar respuestas consistentes.
 */

export const HttpErrors = {
  // --- ERRORES 4xx: Errores del cliente ---

  BAD_REQUEST: {
    statusCode: 400,
    message: 'Bad request', // Error de validación o petición mal formada
    error: 'Bad Request',
  },

  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Authentication required', // Falta autenticación
    error: 'Unauthorized',
  },

  FORBIDDEN: {
    statusCode: 403,
    message: 'Access denied', // Usuario autenticado pero sin permisos
    error: 'Forbidden',
  },

  NOT_FOUND: {
    statusCode: 404,
    message: 'Resource not found', // Recurso no existe
    error: 'Not Found',
  },

  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    message: 'Method not allowed', // Se usa un método HTTP no permitido
    error: 'Method Not Allowed',
  },

  CONFLICT: {
    statusCode: 409,
    message: 'Resource conflict', // Datos duplicados o conflicto en la operación
    error: 'Conflict',
  },

  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    message: 'Validation failed', // Errores de validación de datos
    error: 'Unprocessable Entity',
  },

  TOO_MANY_REQUESTS: {
    statusCode: 429,
    message: 'Too many requests, please try again later', // Límite de rate-limit superado
    error: 'Too Many Requests',
  },

  // --- ERRORES 5xx: Errores del servidor ---

  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error', // Error inesperado en el servidor
    error: 'Internal Server Error',
  },

  BAD_GATEWAY: {
    statusCode: 502,
    message: 'Bad gateway', // Error de un servicio externo
    error: 'Bad Gateway',
  },

  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: 'Service temporarily unavailable', // Servicio caído o mantenimiento
    error: 'Service Unavailable',
  },

  GATEWAY_TIMEOUT: {
    statusCode: 504,
    message: 'Gateway timeout', // Timeout esperando respuesta de otro servicio
    error: 'Gateway Timeout',
  },
} as const;

// Tipo para obtener las claves del catálogo (BAD_REQUEST, NOT_FOUND, etc.)
export type HttpErrorKey = keyof typeof HttpErrors;

// Tipo para representar un error individual del catálogo
export type HttpError = (typeof HttpErrors)[HttpErrorKey];
