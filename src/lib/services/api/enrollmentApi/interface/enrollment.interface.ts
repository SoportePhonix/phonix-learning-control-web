export interface AddEnrollmentRequest {
  studentId: number;
  courseId: number;
}

export interface AddEnrollmentResponse {
  data: Enrollment;
  isSuccess: boolean;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  fullName: string;
  shortName: string;
}

export interface StudentEnrollmentItem {
  course: Course;
}

export interface AvailableCoursesResponse {
  data: Course[];
}

export interface StudentEnrollmentsResponse {
  data: {
    enrollments: StudentEnrollmentItem[];
  };
}

export interface DeleteEnrollmentRequest {
  studentId: number;
  courseId: number;
}

export interface DeleteEnrollmentResponse {
  isSuccess: boolean;
}

export interface GetEnrollmentsByStudentRequest {
  studentId: number;
}

export interface GetEnrollmentsByStudentResponse {
  data: Enrollment[];
}
