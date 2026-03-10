import { createPermissions } from './permission-factory';

export const TRAINING_PATHWAYS_PERMISSIONS = createPermissions('trainingPathways', [
  'view',
  'create',
  'edit',
  'delete',
] as const);

export const TRAINING_PATHWAYS_ALL = Object.values(TRAINING_PATHWAYS_PERMISSIONS);
