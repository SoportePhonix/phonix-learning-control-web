import { PERMISSIONS } from './permissions';
import type { Permission } from './types';

/**
 * Mapa de permisos requeridos por ruta.
 *
 * - Las rutas se evalúan en orden: la primera que coincida se usa.
 * - Se usa `startsWith` para matchear rutas dinámicas.
 * - Si una ruta no está en el mapa, se considera accesible para cualquier usuario autenticado.
 * - Las rutas más específicas deben ir ANTES que las genéricas.
 */
export const ROUTE_PERMISSIONS: { path: string; permissions: Permission[] }[] = [
  // ─── Manage Companies (sub-rutas primero) ───────────────────────
  { path: '/manage-companies/dashboard', permissions: [PERMISSIONS.DASHBOARD_VIEW] },
  { path: '/manage-companies/students', permissions: [PERMISSIONS.STUDENTS_VIEW] },
  { path: '/manage-companies/courses', permissions: [PERMISSIONS.COURSES_VIEW] },
  { path: '/manage-companies/areas', permissions: [PERMISSIONS.AREAS_VIEW] },
  { path: '/manage-companies/positions', permissions: [PERMISSIONS.POSITIONS_VIEW] },
  { path: '/manage-companies', permissions: [PERMISSIONS.MANAGE_COMPANIES_VIEW] },

  // ─── Secciones principales ──────────────────────────────────────
  { path: '/users', permissions: [PERMISSIONS.USERS_VIEW] },
  { path: '/instances', permissions: [PERMISSIONS.INSTANCES_VIEW] },
  { path: '/companies', permissions: [PERMISSIONS.COMPANIES_VIEW] },
  { path: '/lms', permissions: [PERMISSIONS.LMS_VIEW] },
  { path: '/training-routes', permissions: [PERMISSIONS.TRAINING_ROUTES_VIEW] },
  { path: '/students-app', permissions: [PERMISSIONS.STUDENTS_VIEW] },
  { path: '/trainingPathways', permissions: [PERMISSIONS.TRAINING_PATHWAYS_VIEW] },
  { path: '/courses-app', permissions: [PERMISSIONS.COURSES_VIEW] },
];

/**
 * Dado un pathname, retorna los permisos requeridos para acceder.
 * Retorna `null` si la ruta no requiere permisos específicos.
 */
export function getRequiredPermissions(pathname: string): Permission[] | null {
  const entry = ROUTE_PERMISSIONS.find((route) => pathname.startsWith(route.path));
  return entry?.permissions ?? null;
}
