export const HttpErrors = {
  BAD_REQUEST: {
    statusCode: 400,
    message: 'Bad request',
    error: 'Bad Request',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Authentication required',
    error: 'Unauthorized',
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'Access denied',
    error: 'Forbidden',
  },
  NOT_FOUND: {
    statusCode: 404,
    message: 'Resource not found',
    error: 'Not Found',
  },
  METHOD_NOT_ALLOWED: {
    statusCode: 405,
    message: 'Method not allowed',
    error: 'Method Not Allowed',
  },
  CONFLICT: {
    statusCode: 409,
    message: 'Resource conflict',
    error: 'Conflict',
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    message: 'Validation failed',
    error: 'Unprocessable Entity',
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    message: 'Too many requests, please try again later',
    error: 'Too Many Requests',
  },

  // 5xx - Errores del servidor
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Internal server error',
    error: 'Internal Server Error',
  },
  BAD_GATEWAY: {
    statusCode: 502,
    message: 'Bad gateway',
    error: 'Bad Gateway',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: 'Service temporarily unavailable',
    error: 'Service Unavailable',
  },
  GATEWAY_TIMEOUT: {
    statusCode: 504,
    message: 'Gateway timeout',
    error: 'Gateway Timeout',
  },
} as const;

// Tipo para las claves de errores HTTP
export type HttpErrorKey = keyof typeof HttpErrors;

// Tipo para un error HTTP individual
export type HttpError = (typeof HttpErrors)[HttpErrorKey];
