import { api } from '../api';
import { GetPositionsByIdRequest, GetPositionsByIdResponse, GetPositionsResponse } from './interface';

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
} = positionsApi;
