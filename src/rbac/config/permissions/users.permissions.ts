import { createPermissions } from './permission-factory';

export const USERS_PERMISSIONS = createPermissions('users', ['view', 'create', 'edit', 'delete'] as const);

export const USERS_ALL = Object.values(USERS_PERMISSIONS);
