import { createPermissions } from './permission-factory';

export const INSTANCES_PERMISSIONS = createPermissions('instances', ['view', 'create', 'edit', 'delete'] as const);

export const INSTANCES_ALL = Object.values(INSTANCES_PERMISSIONS);
