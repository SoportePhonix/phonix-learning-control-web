import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tipo para respuestas de error de nuestra API
interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string;
    error?: string;
  };
}

// BaseQuery personalizada que detecta errores por success:false
const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // Obtener baseUrl dinámicamente desde el config
  let baseUrl = '/api';

  // Intentar obtener la configuración runtime del window si está disponible
  if (typeof window !== 'undefined') {
    try {
      const configResponse = await fetch('/api/config');
      if (configResponse.ok) {
        const config = await configResponse.json();
        baseUrl = config.baseUrl ? `${config.baseUrl}/api` : '/api';
      }
    } catch (error) {
      console.warn('Could not fetch runtime config, using default baseUrl');
    }
  }

  const baseQuery = fetchBaseQuery({
    baseUrl,
  });

  const result = await baseQuery(args, api, extraOptions);

  // Si la respuesta tiene success: false, lo convertimos a error de RTK Query
  if (result.data && typeof result.data === 'object' && 'success' in result.data) {
    const data = result.data as ApiErrorResponse;
    if (data.success === false) {
      return {
        error: {
          status: data.error?.statusCode || 500,
          data: data.error,
        } as FetchBaseQueryError,
      };
    }
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Users'],

  // 🚀 Configuración personalizada de cache
  keepUnusedDataFor: 300, // 5 minutos (en segundos)
  refetchOnFocus: false, // No revalidar al cambiar ventana
  refetchOnReconnect: true, // Revalidar al reconectar internet
  endpoints: () => ({}),
});
