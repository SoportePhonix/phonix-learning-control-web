import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  }),
  tagTypes: [],

  // 🚀 Configuración personalizada de cache
  keepUnusedDataFor: 300, // 5 minutos (en segundos)
  refetchOnFocus: false, // No revalidar al cambiar ventana
  refetchOnReconnect: true, // Revalidar al reconectar internet
  endpoints: () => ({}),
});
