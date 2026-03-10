import { createPermissions } from './permission-factory';

export const STUDENTS_PERMISSIONS = createPermissions('students', ['view', 'create', 'edit', 'delete'] as const);

export const STUDENTS_ALL = Object.values(STUDENTS_PERMISSIONS);
