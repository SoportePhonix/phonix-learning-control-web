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
  const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
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
