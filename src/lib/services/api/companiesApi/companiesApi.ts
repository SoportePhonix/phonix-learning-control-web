import { api } from '../api';
import {
  AddCompaniesDataResponse,
  AddCompaniesRequest,
  DeleteCompaniesRequest,
  DeleteCompaniesResponse,
  GetCompaniesByIdRequest,
  GetCompaniesByIdResponse,
  GetCompaniesResponse,
  UpdateCompaniesRequest,
  UpdateCompaniesResponse,
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
      invalidatesTags: ['Companies'],
    }),
    updateCompanies: builder.mutation<UpdateCompaniesResponse, UpdateCompaniesRequest>({
      query: ({ id, ...params }) => ({
        url: `/companies/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Companies' }, { type: 'Companies', id }],
    }),
    deleteCompanies: builder.mutation<DeleteCompaniesResponse, DeleteCompaniesRequest>({
      query: ({ id }) => ({
        url: `/companies/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Companies' }, { type: 'Companies', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetCompaniesQuery,
  useGetCompaniesByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddCompaniesMutation,
  useUpdateCompaniesMutation,
  useDeleteCompaniesMutation,
} = companiesApi;
