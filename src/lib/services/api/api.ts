import { normalizeRoleName } from '@/rbac/config/roles';
import { CustomSession } from '@/utils/session';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

// <- Tipado correcto de la sesión

// Tipo para respuestas de error de nuestra API
interface ApiErrorResponse {
  success: false;
  error: {
    statusCode: number;
    message: string;
    error?: string;
  };
}

let cachedSession: CustomSession | null = null;
let sessionFetchTime = 0;
const SESSION_CACHE_TTL = 30000; // 30 segundos

/**
 * Método para limpiar el caché de sesión desde fuera
 * (ej: al hacer login, logout o cambiar de empresa en runtime)
 */
export const invalidateSessionCache = () => {
  cachedSession = null;
  sessionFetchTime = 0;
};

// Creamos fetchBaseQuery FUERA de la función interceptora para evitar re-creación
const rawBaseQuery = fetchBaseQuery({
  baseUrl: `/api`,
  prepareHeaders: async (headers) => {
    // 1. Intentar sacar el companyId desde localStorage (flujo Admin)
    let companyId: string | number | undefined = undefined;

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('selectedCompany');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.id) {
            companyId = parsed.id;
          }
        }
      } catch (e) {
        // Ignorar
      }
    }

    // 2. Si no hay en localStorage, intentar de la sesión (flujo Manager)
    if (!companyId) {
      const now = Date.now();
      if (!cachedSession || now - sessionFetchTime > SESSION_CACHE_TTL) {
        cachedSession = (await getSession()) as CustomSession | null;
        sessionFetchTime = now;
      }
      // 🔥 FIX REAL: Acceder al arreglo companies
      if (cachedSession?.user?.companies?.[0]?.id) {
        companyId = cachedSession.user.companies[0].id;
      }
    }

    // 3. Inyectar el header si tenemos el valor
    if (companyId) {
      headers.set('x-company-id', companyId.toString());
    }

    return headers;
  },
});

// BaseQuery personalizada que detecta errores por success:false y maneja tokens expirados
const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let adjustedArgs = args;

  // Interceptor Multi-Tenant para el rol Manager
  try {
    const now = Date.now();
    // Cache memory para evitar consultar getSession() en el bucle frenético de queries de RTK
    if (!cachedSession || now - sessionFetchTime > SESSION_CACHE_TTL) {
      cachedSession = (await getSession()) as CustomSession | null;
      sessionFetchTime = now;
    }

    if (cachedSession?.user) {
      // Validación defensiva segura
      const roles = cachedSession.user.role || [];
      const isManager = Array.isArray(roles) && roles.some((r) => normalizeRoleName(r.name) === 'manager');
      const companyId = cachedSession.user.companies?.[0]?.id;

      if (isManager && typeof companyId !== 'undefined' && companyId !== null) {
        if (typeof adjustedArgs === 'string') {
          // Si args es un string simple (GET implícito), incrustamos usando URL object para evitar problemas de formato
          const url = new URL(adjustedArgs, 'http://dummy-base');
          url.searchParams.set('companyId', companyId.toString());
          adjustedArgs = url.pathname + url.search;
        } else {
          // Si args es un objeto FetchArgs, insertamos formatedo según el método
          const method = (adjustedArgs.method || 'GET').toUpperCase();

          if (method === 'GET' || method === 'DELETE') {
            // Delete NO suele aceptar bodys de manera confiable con fetch/axios en backend REST estrictos
            adjustedArgs = {
              ...adjustedArgs,
              params: {
                ...adjustedArgs.params,
                companyId,
              },
            };
          }
          // 🔥 NOTA: Para POST, PUT y PATCH, ya NO inyectamos el companyId en el body,
          // porque algunos endpoints como el de LMS lo rechazan.
          // El backend ya lo tomará del header `x-company-id` en el lado del servidor.
        }
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Interceptor multi-tenant error:', err);
    }
  }

  const result = await rawBaseQuery(adjustedArgs, api, extraOptions);

  // Manejar errores 401 (Unauthorized) - Token expirado o inválido
  if (result.error && result.error.status === 401) {
    // Redirigir al logout solo en el cliente
    if (typeof window !== 'undefined') {
      window.location.href = '/logout';
    }
    return result;
  }

  // Si la respuesta tiene success: false, lo convertimos a error de RTK Query
  if (result.data && typeof result.data === 'object' && 'success' in result.data) {
    const data = result.data as ApiErrorResponse;
    if (data.success === false) {
      // También verificar si es un error 401 en la estructura de datos
      if (data.error?.statusCode === 401) {
        console.warn('Token expirado detectado en respuesta. Redirigiendo al logout...');
        if (typeof window !== 'undefined') {
          window.location.href = '/logout';
        }
      }

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
  tagTypes: ['Users', 'Companies', 'Courses', 'Students', 'Areas', 'Positions', 'Instance', 'Lms'],

  // 🚀 Configuración personalizada de cache
  keepUnusedDataFor: 300, // 5 minutos (en segundos)
  refetchOnFocus: false, // No revalidar al cambiar ventana
  refetchOnReconnect: true, // Revalidar al reconectar internet
  endpoints: () => ({}),
});
