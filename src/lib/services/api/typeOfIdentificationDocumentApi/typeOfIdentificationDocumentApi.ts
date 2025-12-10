import { api } from '../api';
import { DocumentTypesResponse } from './interface';

export const typeOfDocumentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypeOfIdentificationDocument: builder.query<DocumentTypesResponse, void>({
      query: () => {
        return '/documentTypes/all';
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  /**
   * Get
   */
  useGetAllTypeOfIdentificationDocumentQuery,

  /**
   * Lazy Get
   */

  /**
   * Mutations
   */
} = typeOfDocumentApi;
