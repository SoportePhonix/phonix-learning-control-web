import { api } from '../api';
import { GetAreasByIdRequest, GetAreasByIdResponse, GetAreasResponse } from './interface';

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
} = areasApi;
