import { createPermissions } from './permission-factory';

export const DASHBOARD_PERMISSIONS = createPermissions('dashboard', ['view'] as const);

export const DASHBOARD_ALL = Object.values(DASHBOARD_PERMISSIONS);
