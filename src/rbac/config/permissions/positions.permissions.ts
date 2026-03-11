import { createPermissions } from './permission-factory';

export const POSITIONS_PERMISSIONS = createPermissions('positions', ['view', 'create', 'edit', 'delete'] as const);

export const POSITIONS_ALL = Object.values(POSITIONS_PERMISSIONS);
