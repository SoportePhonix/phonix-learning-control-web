export interface GetCoursesResponse {
  data: Courses[];
}

export interface Courses {
  id: number;
  fullName: string;
  shortName: string;
  status: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  companyId: number;
  companyName?: string;
  companies?: Array<{
    id: number;
    name: string;
  }>;
}

export interface AddCoursesRequest {
  fullName: string;
  shortName: string;
  status: string;
  companyId: number;
  summary?: string;
  startDate?: string;
  endDate?: string;
}

export interface AddCoursesDataResponse {
  data: {
    id: number;
    fullName: string;
    shortName: string;
    summary?: string;
    status: string;
    startDate?: string;
    endDate?: string;
    companyId: number;
    companyName?: string;
  };
  isSuccess: boolean;
}

export interface GetCoursesByIdResponse {
  data: Courses;
}

export interface GetCoursesByIdRequest {
  courseId: string;
}

export interface UpdateCoursesRequest {
  id: number;
  fullName: string;
  shortName: string;
  status: string;
  companyId: number;
  summary?: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdateCoursesResponse {
  data: {
    id: number;
    fullName: string;
    shortName: string;
    summary?: string;
    status: string;
    startDate?: string;
    endDate?: string;
    companyId: number;
    companyName?: string;
  };
  isSuccess: boolean;
}

export interface DeleteCoursesRequest {
  id: number;
}

export interface DeleteCoursesResponse {
  isSuccess: boolean;
}
