import { api } from '../api';
import {
  AddCompaniesDataResponse,
  AddCompaniesRequest,
  GetCompaniesByIdRequest,
  GetCompaniesByIdResponse,
  GetCompaniesResponse,
} from './interface';

export const companiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<GetCompaniesResponse, void>({
      query: () => '/companies/all',
      providesTags: ['Companies'],
    }),
    getCompaniesById: builder.query<GetCompaniesByIdResponse, GetCompaniesByIdRequest>({
      query: ({ companiesId }) => `/companies/${companiesId}`,
      providesTags: (result, error, { companiesId }) => [{ type: 'Companies', id: companiesId }],
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
