import { createPermissions } from './permission-factory';

export const COURSES_PERMISSIONS = createPermissions('courses', ['view', 'create', 'edit', 'delete'] as const);

export const COURSES_ALL = Object.values(COURSES_PERMISSIONS);
