import { api } from '../api';
import { GetUsersResponse } from './interface';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUsersResponse, void>({
      query: () => {
        return '/users/all';
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  /**
   * Get
   */
  useGetAllUsersQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
} = usersApi;
