import { createPermissions } from './permission-factory';

export const MANAGE_COMPANIES_PERMISSIONS = createPermissions('manageCompanies', ['view', 'manage'] as const);

export const MANAGE_COMPANIES_ALL = Object.values(MANAGE_COMPANIES_PERMISSIONS);
