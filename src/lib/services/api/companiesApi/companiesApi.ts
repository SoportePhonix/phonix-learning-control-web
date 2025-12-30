import { api } from '../api';
import { GetCompaniesResponse } from './interface';

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => '/companies',
      providesTags: ['Users'],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetCompaniesQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
} = companiesApi;
