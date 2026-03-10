/**
 * Tipos genéricos del motor RBAC.
 * No contienen lógica de negocio — son reutilizables en cualquier proyecto.
 */

/**
 * Estructura de un rol tal como viene en session.user.role[].
 */
export interface SessionRole {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
