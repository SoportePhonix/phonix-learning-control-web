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

// Cache para la configuración runtime
let runtimeConfig: { baseUrl: string } | null = null;
let configPromise: Promise<{ baseUrl: string }> | null = null;

// Función para obtener la configuración runtime una sola vez
const getRuntimeConfig = async (): Promise<string> => {
  if (runtimeConfig) {
    return runtimeConfig.baseUrl;
  }

  if (configPromise) {
    const config = await configPromise;
    return config.baseUrl;
  }

  configPromise = fetch('/api/config')
    .then((res) => res.json())
    .then((config) => {
      const baseUrl = config.baseUrl || '';
      runtimeConfig = { baseUrl };
      return { baseUrl };
    })
    .catch((error) => {
      console.warn('Could not fetch runtime config:', error);
      const baseUrl = '';
      runtimeConfig = { baseUrl };
      return { baseUrl };
    });

  const config = await configPromise;
  return config.baseUrl;
};

// BaseQuery personalizada que detecta errores por success:false
const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // Obtener baseUrl dinámicamente (solo en el cliente)
  let baseUrl = '/api';

  if (typeof window !== 'undefined') {
    const configBaseUrl = await getRuntimeConfig();
    baseUrl = configBaseUrl ? `${configBaseUrl}/api` : '/api';
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
