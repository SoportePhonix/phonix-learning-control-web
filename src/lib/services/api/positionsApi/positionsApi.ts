import { api } from '../api';
import {
  AddPositionsDataResponse,
  AddPositionsRequest,
  DeletePositionsRequest,
  DeletePositionsResponse,
  GetPositionsByIdRequest,
  GetPositionsByIdResponse,
  GetPositionsResponse,
  UpdatePositionsRequest,
  UpdatePositionsResponse,
} from './interface';

export const positionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<GetPositionsResponse, void>({
      query: () => '/positions/all',
      providesTags: ['Positions'],
    }),
    getPositionById: builder.query<GetPositionsByIdResponse, GetPositionsByIdRequest>({
      query: ({ positionId }) => `/positions/${positionId}`,
      providesTags: (result, error, { positionId }) => [{ type: 'Positions', id: positionId }],
    }),
    addPositions: builder.mutation<AddPositionsDataResponse, AddPositionsRequest>({
      query: (params) => ({
        url: '/positions/add',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Positions'],
    }),
    updatePositions: builder.mutation<UpdatePositionsResponse, UpdatePositionsRequest>({
      query: ({ id, ...params }) => ({
        url: `/positions/edit/${id}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Positions' }, { type: 'Positions', id }],
    }),
    deletePositions: builder.mutation<DeletePositionsResponse, DeletePositionsRequest>({
      query: ({ id }) => ({
        url: `/positions/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Positions' }, { type: 'Positions', id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetPositionsQuery,
  useGetPositionByIdQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
  useAddPositionsMutation,
  useUpdatePositionsMutation,
  useDeletePositionsMutation,
} = positionsApi;
