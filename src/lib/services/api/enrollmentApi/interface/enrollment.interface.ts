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
