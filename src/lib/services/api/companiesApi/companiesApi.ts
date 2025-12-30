import { api } from '../api';
import { AddCompaniesDataResponse, AddCompaniesRequest, GetCompaniesResponse } from './interface';

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => '/companies/all',
      providesTags: ['Users'],
    }),
    addCompanies: builder.mutation<AddCompaniesDataResponse, AddCompaniesRequest>({
      query: (params) => ({
        url: '/companies/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
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
  useAddCompaniesMutation,
} = companiesApi;
