// ─── Permisos por módulo ────────────────────────────────────────────
// Cada módulo exporta sus constantes y su agrupación *_ALL.
// Este archivo los reúne en un solo objeto PERMISSIONS.
import { AREAS_PERMISSIONS } from './areas.permissions';
import { COMPANIES_PERMISSIONS } from './companies.permissions';
import { COURSES_PERMISSIONS } from './courses.permissions';
import { DASHBOARD_PERMISSIONS } from './dashboard.permissions';
import { INSTANCES_PERMISSIONS } from './instances.permissions';
import { LMS_PERMISSIONS } from './lms.permissions';
import { MANAGE_COMPANIES_PERMISSIONS } from './manage-companies.permissions';
import { POSITIONS_PERMISSIONS } from './positions.permissions';
import { STUDENTS_PERMISSIONS } from './students.permissions';
import { TRAINING_PATHWAYS_PERMISSIONS } from './training-pathways.permissions';
import { USERS_PERMISSIONS } from './users.permissions';

/**
 * Objeto unificado de permisos.
 * Uso: `PERMISSIONS.USERS_VIEW`, `PERMISSIONS.COURSES_CREATE`, etc.
 */
export const PERMISSIONS = {
  ...USERS_PERMISSIONS,
  ...COMPANIES_PERMISSIONS,
  ...INSTANCES_PERMISSIONS,
  ...LMS_PERMISSIONS,
  ...COURSES_PERMISSIONS,
  ...STUDENTS_PERMISSIONS,
  ...TRAINING_PATHWAYS_PERMISSIONS,
  ...AREAS_PERMISSIONS,
  ...POSITIONS_PERMISSIONS,
  ...MANAGE_COMPANIES_PERMISSIONS,
  ...DASHBOARD_PERMISSIONS,
} as const;
