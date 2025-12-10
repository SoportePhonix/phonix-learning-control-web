import { api } from '../api';
import { RolesResponse } from './interface/roles.interface';

export const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query<RolesResponse, void>({
      query: () => {
        return '/roles/all';
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  /**
   * Get
   */
  useGetAllRolesQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
} = rolesApi;
