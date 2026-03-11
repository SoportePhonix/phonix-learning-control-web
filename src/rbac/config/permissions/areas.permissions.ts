import { createPermissions } from './permission-factory';

export const AREAS_PERMISSIONS = createPermissions('areas', ['view', 'create', 'edit', 'delete'] as const);

export const AREAS_ALL = Object.values(AREAS_PERMISSIONS);
