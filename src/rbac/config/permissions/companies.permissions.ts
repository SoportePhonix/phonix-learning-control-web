import { createPermissions } from './permission-factory';

export const COMPANIES_PERMISSIONS = createPermissions('companies', ['view', 'create', 'edit', 'delete'] as const);

export const COMPANIES_ALL = Object.values(COMPANIES_PERMISSIONS);
