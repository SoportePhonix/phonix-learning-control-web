import { api } from '../api';
import {
  AddEnrollmentRequest,
  AddEnrollmentResponse,
  AvailableCoursesResponse,
  DeleteEnrollmentRequest,
  DeleteEnrollmentResponse,
  StudentEnrollmentsResponse,
} from './interface';

export const enrollmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudentEnrollments: builder.query<StudentEnrollmentsResponse, number>({
      query: (studentId) => `/enrollment/student/${studentId}`,
      providesTags: (result, error, studentId) => [{ type: 'Enrollments', id: studentId }],
    }),
    getAvailableCourses: builder.query<AvailableCoursesResponse, number>({
      query: (studentId) => `/enrollment/student/${studentId}/available-courses`,
      providesTags: (result, error, studentId) => [{ type: 'AvailableCourses', id: studentId }],
    }),
    addEnrollment: builder.mutation<AddEnrollmentResponse, AddEnrollmentRequest>({
      query: (params) => ({
        url: '/enrollment',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: (result, error, { studentId }) => [
        { type: 'Enrollments', id: studentId },
        { type: 'AvailableCourses', id: studentId },
      ],
    }),
    deleteEnrollment: builder.mutation<DeleteEnrollmentResponse, DeleteEnrollmentRequest>({
      query: ({ studentId, courseId }) => ({
        url: `/enrollment/${studentId}/${courseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { studentId }) => [
        { type: 'Enrollments', id: studentId },
        { type: 'AvailableCourses', id: studentId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  /**
   * Get
   */
  useGetStudentEnrollmentsQuery,
  useGetAvailableCoursesQuery,

  /**
   * Mutations
   */
  useAddEnrollmentMutation,
  useDeleteEnrollmentMutation,
} = enrollmentApi;
