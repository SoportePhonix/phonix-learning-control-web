import { api } from '../api';
import { TypeOfIdentificationDocument } from './interface/typeOfIdentificationDocument.interface';

export const typeOfDocumentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTypeOfIdentificationDocument: builder.query<TypeOfIdentificationDocument, void>({
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
