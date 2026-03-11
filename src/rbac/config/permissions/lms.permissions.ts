import { createPermissions } from './permission-factory';

export const LMS_PERMISSIONS = createPermissions('lms', ['view', 'create', 'edit', 'delete'] as const);

export const LMS_ALL = Object.values(LMS_PERMISSIONS);
