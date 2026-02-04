import { api } from '../api';
import {
  AddAreasDataResponse,
  AddAreasRequest,
  DeleteAreasRequest,
  DeleteAreasResponse,
  GetAreasByIdRequest,
  GetAreasByIdResponse,
  GetAreasResponse,
  UpdateAreasRequest,
  UpdateAreasResponse,
} from './interface';

export const areasApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAreas: builder.query<GetAreasResponse, void>({
      query: () => '/areas/all',
      providesTags: ['Areas'],
    }),
    getAreaById: builder.query<GetAreasByIdResponse, GetAreasByIdRequest>({
      query: ({ areaId }) => `/areas/${areaId}`,
      providesTags: (result, error, { areaId }) => [{ type: 'Areas', id: areaId }],
    }),
    addAreas: builder.mutation<AddAreasDataResponse, AddAreasRequest>({
      query: (params) => ({
        url: '/areas/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Areas'],
    }),
    updateAreas: builder.mutation<UpdateAreasResponse, UpdateAreasRequest>({
      query: ({ id, ...params }) => ({
        url: `/areas/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Areas' }, { type: 'Areas', id }],
    }),
    deleteAreas: builder.mutation<DeleteAreasResponse, DeleteAreasRequest>({
      query: ({ id }) => ({
        url: `/areas/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Areas' }, { type: 'Areas', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetAreasQuery,
  useGetAreaByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddAreasMutation,
  useUpdateAreasMutation,
  useDeleteAreasMutation,
} = areasApi;
