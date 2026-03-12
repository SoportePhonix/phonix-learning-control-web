import { createPermissions } from './permission-factory';

export const TRAINING_ROUTES_PERMISSIONS = createPermissions('trainingRoutes', [
  'view',
  'create',
  'edit',
  'delete',
] as const);
