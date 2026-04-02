import { api } from '../api';
import {
  AddEnrollmentRequest,
  AddEnrollmentResponse,
  DeleteEnrollmentRequest,
  DeleteEnrollmentResponse,
} from './interface';

export const enrollmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addEnrollment: builder.mutation<AddEnrollmentResponse, AddEnrollmentRequest>({
      query: (params) => ({
        url: '/enrollment',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: (result, error, { studentId }) => [
        { type: 'Enrollments', id: studentId },
        { type: 'Enrollments' },
      ],
    }),
    deleteEnrollment: builder.mutation<DeleteEnrollmentResponse, DeleteEnrollmentRequest>({
      query: ({ studentId, courseId }) => ({
        url: `/enrollment/${studentId}/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { studentId }) => [
        { type: 'Enrollments', id: studentId },
        { type: 'Enrollments' },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */

  /**
   * Mutations
   */
  useAddEnrollmentMutation,
  useDeleteEnrollmentMutation,
} = enrollmentApi;
