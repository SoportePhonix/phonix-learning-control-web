import type { Action, Module, Permission } from '../types';

// ─── Type-level camelCase → SNAKE_CASE ──────────────────────────────

/**
 * Inserta '_' antes de cada letra mayúscula en un string literal type.
 * 'trainingPathways' → 'training_Pathways'
 */
type CamelToSnake<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Head extends Uppercase<Head>
    ? Head extends Lowercase<Head>
      ? `${Head}${CamelToSnake<Tail>}`
      : `_${Lowercase<Head>}${CamelToSnake<Tail>}`
    : `${Head}${CamelToSnake<Tail>}`
  : S;

/**
 * Convierte un string literal camelCase a UPPER_SNAKE_CASE.
 * 'trainingPathways' → 'TRAINING_PATHWAYS'
 * 'manageCompanies'  → 'MANAGE_COMPANIES'
 * 'users'            → 'USERS'
 */
type UpperSnake<S extends string> = Uppercase<CamelToSnake<S>>;

// ─── Runtime camelCase → SNAKE_CASE ─────────────────────────────────

function toSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

// ─── Factory ────────────────────────────────────────────────────────

/**
 * Genera automáticamente un objeto de permisos para un módulo.
 *
 * @example
 * const USERS_PERMISSIONS = createPermissions('users', ['view', 'create', 'edit', 'delete'] as const);
 * // → { USERS_VIEW: 'users.view', USERS_CREATE: 'users.create', ... }
 *
 * const USERS_ALL = Object.values(USERS_PERMISSIONS);
 * // → ['users.view', 'users.create', 'users.edit', 'users.delete']
 */
export function createPermissions<M extends Module, A extends readonly Action[]>(
  module: M,
  actions: A
): { readonly [K in A[number] as `${UpperSnake<M>}_${Uppercase<K>}`]: `${M}.${K}` } {
  const permissions = {} as Record<string, Permission>;
  const prefix = toSnakeCase(module);

  for (const action of actions) {
    const key = `${prefix}_${action.toUpperCase()}`;
    permissions[key] = `${module}.${action}` as Permission;
  }

  return permissions as {
    readonly [K in A[number] as `${UpperSnake<M>}_${Uppercase<K>}`]: `${M}.${K}`;
  };
}
